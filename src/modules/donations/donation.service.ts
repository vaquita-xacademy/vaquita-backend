import { Donation, Project, User } from "../../db/models";
import { ForbiddenException, NotFoundException } from "../../exceptions";
import { ProjectStatus, UserRole } from "../../types/enums";
import { sequelize } from "../../db/sequelize";
import { CreateDonationDTO } from "./dto/create-donation.dto";

export class DonationService {

    public async create(donorId: number, dto: CreateDonationDTO) {
        return sequelize.transaction(async (transaction) => {
            const project = await Project.findByPk(dto.project_id, { transaction });

            if (!project) {
                throw new NotFoundException("Proyecto no encontrado");
            }

            if (project.status !== ProjectStatus.ACTIVE) {
                throw new ForbiddenException("Solo se puede donar a proyectos activos");
            }

            const donation = await Donation.create(
                {
                    donor_id: donorId,
                    project_id: dto.project_id,
                    amount: dto.amount,
                    message: dto.message ?? null,
                },
                { transaction }
            );

            await project.increment("current_amount", { by: dto.amount, transaction });

            return donation;
        });
    }

    public async listMine(donorId: number) {
        return Donation.findAll({
            where: { donor_id: donorId },
            include: [
                { model: Project, as: "project", attributes: ["id", "title", "slug"] },
            ],
            order: [["created_at", "DESC"]],
        });
    }

    public async listByProject(projectId: number, requesterId: number, requesterRole: UserRole) {
        const project = await Project.findByPk(projectId);

        if (!project) {
            throw new NotFoundException("Proyecto no encontrado");
        }

        if (requesterRole !== UserRole.ADMIN && project.owner_id !== requesterId) {
            throw new ForbiddenException("No tienes permiso para ver las donaciones de este proyecto");
        }

        return Donation.findAll({
            where: { project_id: projectId },
            include: [
                { model: User, as: "donor", attributes: ["id", "name"] },
            ],
            order: [["created_at", "DESC"]],
        });
    }
}
