import { CreateProjectDTO } from "./dto/create-project.dto";
import { UpdateProjectDTO } from "./dto/update-project.dto";
import { InternalServerErrorException, ForbiddenException, NotFoundException } from "../../exceptions";
import { sequelize } from "../../db/sequelize";
import { BudgetItem, Category, Project, User } from "../../db/models";
import { ProjectStatus, SortOptions, UserRole } from "../../types/enums";
import slugify from "slugify";
import { ListPaginateProjectQuery } from "../../types/interfaces";
import { toPaginate } from "../../helpers/paginate";
import { ProjectResource } from "./resource/project.resource";
import { Op, Order, WhereOptions } from "sequelize";
import { ProjectRules } from "./rules/project.rules";
import { BudgetItemsService } from "../budget-items/budget-items.service";

export class ProjectService {
    constructor(private readonly budgetItemsService: BudgetItemsService ) {}

    public async create(userId: number, dto: CreateProjectDTO) {
        return sequelize.transaction(async (transaction) => {
            const slug = slugify(dto.title, { lower: true, strict: true });
            const uniqueSlug = `${slug}-${Math.floor(Math.random() * 1000)}`;

            const projectCreated = await Project.create(
                {
                    owner_id: userId,
                    category_id: dto.category_id,
                    title: dto.title,
                    description: dto.description,
                    goal_amount: dto.goal_amount,
                    current_amount: 0,
                    location: {
                        province: dto.location.province,
                        city: dto.location.city,
                    },
                    image_url: dto.image_url,
                    status: ProjectStatus.ACTIVE,
                    slug: uniqueSlug,
                    budget_items: dto.budget_items,
                },{
                    include: [{model: BudgetItem, as: 'budget_items'}],
                    transaction
                }
            );

            if (!projectCreated) {
                throw new InternalServerErrorException("No se pudo recuperar el proyecto creado");
            }

            await projectCreated.reload({
                include: [
                    {model: Category, as: 'category_data'}, 
                    {model: BudgetItem, as: 'budget_items'}, 
                    {model: User, as: 'owner', attributes: ["id", "name"]},
                ],transaction
            });

            return projectCreated;
        });
    }

    public async listAllPaginate(queryPaginate: ListPaginateProjectQuery) {
        const include = [
            { model: Category, as: "category_data", attributes: ["id", "name"] },
            { model: User, as: "owner", attributes: ["id", "name"] },
        ];
        const where: WhereOptions = {};
        const order = this.matchSortOption(queryPaginate.sort) as Order;

        if (queryPaginate.category_id) where.category_id = queryPaginate.category_id;
        if (queryPaginate.status) where.status = queryPaginate.status;
        if (queryPaginate.search) {
            where.title = { [Op.iLike]: `%${queryPaginate.search}%` };
        }

        const result = await Project.paginate({
            limit: queryPaginate.limit,
            after: queryPaginate.after,
            before: queryPaginate.before,
            include,
            where,
            order,
            attributes: Project.cardAttributes,
        });

        const paginated = toPaginate<Project>(result);
        return {
            ...paginated,
            items: paginated.items.map(ProjectResource.toCard),
        };
    }

    public async findBySlug(slug: string) {
        const project = await Project.findOne({
            where: { slug },
            include: [
                { model: Category, as: "category_data" },
                { model: User, as: "owner", attributes: ["id", "name"] },
            ],
        });

        if (!project) {
            throw new NotFoundException("Proyecto no encontrado");
        }

        return project;
    }

    public async listByOwner(ownerId: number, queryPaginate: ListPaginateProjectQuery) {
        const include = [
            { model: Category, as: "category_data", attributes: ["id", "name"] },
        ];
        const where: WhereOptions = { owner_id: ownerId };
        const order = this.matchSortOption(queryPaginate.sort) as Order;

        if (queryPaginate.status) where.status = queryPaginate.status;
        if (queryPaginate.search) {
            where.title = { [Op.iLike]: `%${queryPaginate.search}%` };
        }

        const result = await Project.paginate({
            limit: queryPaginate.limit,
            after: queryPaginate.after,
            before: queryPaginate.before,
            include,
            where,
            order,
            attributes: Project.attributes,
        });

        const paginated = toPaginate<Project>(result);
        return {
            ...paginated,
            items: paginated.items.map(ProjectResource.toResponse),
        };
    }

    public async update(projectId: number, userId: number, userRole: UserRole, dto: UpdateProjectDTO) {
        const project = await Project.findByPk(projectId);

        if (!project) {
            throw new NotFoundException("Proyecto no encontrado");
        }

        if (userRole !== UserRole.ADMIN && project.owner_id !== userId) {
            throw new ForbiddenException("No tienes permiso para editar este proyecto");
        }

        await project.update(dto);
        await project.reload({
            include: [{ model: Category, as: "category_data" }],
        });

        return project;
    }

    public async updateStatus(projectId: number, userId: number, userRole: UserRole, status: ProjectStatus) {
        const project = await Project.findByPk(projectId);

        if (!project) {
            throw new NotFoundException("Proyecto no encontrado");
        }

        if (userRole !== UserRole.ADMIN && project.owner_id !== userId) {
            throw new ForbiddenException("No tienes permiso para modificar este proyecto");
        }

        await project.update({ status });

        return project;
    }

    private matchSortOption(sortOption?: SortOptions) {
        switch (sortOption) {
            case SortOptions.NEWEST: return [["created_at", "DESC"]];
            case SortOptions.OLDEST: return [["created_at", "ASC"]];
            case SortOptions.TITLE_ASC: return [["title", "ASC"]];
            case SortOptions.TITLE_DESC: return [["title", "DESC"]];
            case SortOptions.PROGRESS_ASC: return [['progress', 'ASC']];
            case SortOptions.PROGRESS_DESC: return [['progress', 'DESC']];
            default: return [["created_at", "DESC"]];
        }
    }

    public async findBySlug(slug: string) {
        const project = await Project.findOne({
            where: {
                slug: slug
            },
            include: [
                {model: BudgetItem, as: 'budget_items', attributes: ["id", "name", "amount"]},
                { model: Category, as: "category_data", attributes: ["id", "name"], },
                { model: User, as: "owner", attributes: ["id", "name"], },
            ],
            attributes: Project.attributes,
        });

        if (!project) {
            throw new NotFoundException("Proyecto no encontrado");
        }

        return project;
    }

    public async update(id: number, userId: number, userRole: UserRole, dto: UpdateProjectDTO) {
        const projectUpdate = await sequelize.transaction(async (transaction) => {
            const project = await Project.findByPk(id, {transaction});

            if (!project) throw new NotFoundException("Proyecto no encontrado");

            if (userRole !== UserRole.ADMIN && project.owner_id !== userId)
                throw new ForbiddenException("No tienes permiso para editar este proyecto");

            if (dto.goal_amount !== undefined)
                ProjectRules.ensureCanUpdateGoal(project.current_amount, dto.goal_amount);
            
            await project.update(dto, { transaction });

            if (dto.budget_items) {
                await this.budgetItemsService.sync(project.id, dto.budget_items, transaction);
            }

            return await project.reload({
                include: [
                    {model: Category, as: 'category_data'}, 
                    {model: BudgetItem, as: 'budget_items'}, 
                    {model: User, as: 'owner', attributes: ["id", "name"]},
                ],transaction
            });
        });

        return projectUpdate;
    }

    public async delete(id: number, userId: number, userRole: UserRole) {
        const project = await Project.findByPk(id);

        if (!project) throw new NotFoundException("Proyecto no encontrado");

        if (userRole !== UserRole.ADMIN && project.owner_id !== userId){
            throw new ForbiddenException("No tienes permiso para editar este proyecto");
        }

        if (project.status === ProjectStatus.COMPLETED) {
            throw new ForbiddenException("Los proyectos completados no pueden eliminarse.");
        }

        ProjectRules.ensureNoDonations(project.current_amount);

        await project.destroy();
        return true;
    }
}
