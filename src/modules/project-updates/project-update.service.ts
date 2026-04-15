import { CreateEvidenceDTO } from "./dto/create-evidence.dto";
import { sequelize } from "../../db/sequelize";
import { Project, ProjectUpdate } from "../../db/models";
import { NotFoundException } from "../../exceptions";
import { UserRole } from "../../types/enums";
import { ForbiddenException } from "../../exceptions";
import { UpdateEvidenceDTO } from "./dto/update-evidence.dto";
import { deleteFromCloudinary } from "../../helpers/image-uploader";

export class ProjectUpdateService {
    public async create(projectId: number, dto: CreateEvidenceDTO, userId: number, userRole: UserRole) {
        const project = await Project.findByPk(projectId);
        if (!project) throw new NotFoundException("Proyecto no encontrado");

        if (userRole !== UserRole.ADMIN && project.owner_id !== userId) {
            throw new ForbiddenException("No tienes permiso para realizar esta acción");
        }

        return sequelize.transaction(async (transaction) => {
            const updateProjectCreated = await ProjectUpdate.create({
                project_id: projectId,
                title: dto.title,
                description: dto.description,
                receipt_url: dto.receipt_url,
                image_public_id: dto.image_public_id,
            }, { transaction });

            return updateProjectCreated;
        })
    }

    public async getByProject(projectId: number) {
        const projectUpdate = await ProjectUpdate.findAll({
            where: { project_id: projectId },
            order: [['created_at', 'DESC']],
            attributes: ProjectUpdate.attributes,
        });

        return projectUpdate;
    }

    public async update(projectId: number,id: number, dto: UpdateEvidenceDTO, userId: number, userRole: UserRole) {
        const projectUpdate = await ProjectUpdate.findOne({
            where: { project_id: projectId, id: id },
            include: [{ model: Project, as: 'project' }]
        });
        if (!projectUpdate) throw new NotFoundException("Actualización no encontrada");

        const project = (projectUpdate as any).project;
        if (userRole !== UserRole.ADMIN && project.owner_id !== userId) {
            throw new ForbiddenException("No tienes permiso para realizar esta acción");
        }
        
        return sequelize.transaction(async (transaction) => {
            if (dto.image_public_id && projectUpdate.image_public_id && dto.image_public_id !== projectUpdate.image_public_id) {
                deleteFromCloudinary(projectUpdate.image_public_id);
            }

            return await projectUpdate.update(dto, { transaction });
        })
    }

}