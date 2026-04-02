import { CreateProjectDTO } from "./dto/create-project.dto";
import { InternalServerErrorException } from "../../exceptions";
import { sequelize } from "../../db/sequelize";
import { BudgetItem, Category, Project, User } from "../../db/models";
import { ProjectStatus, SortOptions } from "../../types/enums";
import slugify from "slugify";
import { ListPaginateProjectQuery } from "../../types/interfaces";
import { toPaginate } from "../../helpers/paginate";
import { Order, WhereOptions } from "sequelize";
import { Op } from "sequelize";

export class ProjectService {
    public async create(userId: number, dto: CreateProjectDTO) {
        return sequelize.transaction(async (transaction) => {

            //generar slug a partir del titulo
            // Ejemplo: "Ayuda a Comedores" -> "ayuda-a-comedores-168"
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
                        city: dto.location.city
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
                include: [{ 
                    model: Category, 
                    as: "category_data" 
                },
                {
                    model: BudgetItem,
                    as: 'budget_items'
                }],
                transaction
            });

            return projectCreated;
        });
    }

    public async listAllPaginate(queryPaginate: ListPaginateProjectQuery) {
        const include = [
            { model: Category, as: "category_data", attributes: ["id", "name"], },
            { model: User, as: "owner", attributes: ["id", "name"], },
        ];
        const where: WhereOptions = {};
        const order = this.matchSortOption(queryPaginate.sort) as Order;

        if (queryPaginate.category_id)
            where.category_id = queryPaginate.category_id;

        if (queryPaginate.status)
            where.status = queryPaginate.status;

        if (queryPaginate.search) {
            where.title = {
                [Op.iLike]: `%${queryPaginate.search}%`,
            };
        }

        const result = await Project.paginate({
            limit: queryPaginate.limit,
            after: queryPaginate.after,
            before: queryPaginate.before,
            include: include,
            where: where,
            order: order,
            attributes: Project.cardAttributes,
        });

        return toPaginate<Project>(result);
    }

    private matchSortOption(sortOption?: SortOptions) {
        switch (sortOption) {
            case SortOptions.NEWEST:
                return [['created_at', 'DESC']];
                break;
            case SortOptions.OLDEST:
                return [['created_at', 'ASC']];
                break;
            case SortOptions.TITLE_ASC:
                return [['title', 'ASC']];
                break;
            case SortOptions.TITLE_DESC:
                return [['title', 'DESC']];
                break;
            case SortOptions.PROGRESS_ASC:
                return [['progress', 'ASC']];
                break;
            case SortOptions.PROGRESS_DESC:
                return [['progress', 'DESC']];
                break;
        }
        return [['created_at', 'DESC']];
    }
}

