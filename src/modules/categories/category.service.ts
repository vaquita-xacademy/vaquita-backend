import { CreateCategoryDTO } from "./dto/create-category.dto";
import { sequelize } from "../../db/sequelize";
import { ConflictException,  NotFoundException } from "../../exceptions";
import { Category, Project } from "../../db/models";
import { errorMessage } from "../../helpers/messages";

export class CategoryService {
    public async create(dto: CreateCategoryDTO) {
        return await sequelize.transaction(async (transaction) => {

            const existingCategory = await Category.findOne({
                where: { name: dto.name },
                paranoid: false,
                transaction,
            });

            if (existingCategory) {
                if (existingCategory.deleted_at) {
                    await existingCategory.restore({ transaction });

                    if (dto.icon_name) {
                        existingCategory.icon_name = dto.icon_name;
                        await existingCategory.save({ transaction });
                    }
                    return existingCategory;
                }
                throw new ConflictException(errorMessage.already_exists);
            }

            const categoryCreated = await Category.create(
                {
                    name: dto.name,
                    icon_name: dto.icon_name ?? "default-icon",
                }, { transaction });

            return categoryCreated;
        });
    }

    public async findAll() {
        return Category.findAll({
            order: [['name', 'ASC']]
        });
    }

    public async delete(id: number) {
        return sequelize.transaction(async (transaction) => {
            const category = await Category.findByPk(id, { transaction });
            if (!category) throw new NotFoundException("Categoría no encontrada");

            const projects = await Project.findOne({
                where: { category_id: id }, attributes: ["id"], transaction,
            });
            if (projects) throw new ConflictException("No puede ser eliminada porque tiene proyectos");

            await category.destroy({ transaction });
            return true;
        });
    }

}