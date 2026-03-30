import { CreateProjectDTO } from "./dto/create-project.dto";
import { InternalServerErrorException } from "../../exceptions";
import { sequelize } from "../../db/sequelize";
import { Category, Project } from "../../db/models";
import { ProjectStatus } from "../../types/enums";
import slugify from "slugify"; //npm install slugify

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
                }, { transaction }
            );

            if (!projectCreated){
                throw new InternalServerErrorException("No se pudo recuperar el proyecto creado");
            }

            await projectCreated.reload({
                include: [{ 
                    model: Category, 
                    as: "category_data" 
                }],
                transaction
            });

            return projectCreated;
        });
    }
}

