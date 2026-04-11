import { VerifiedProfile } from "../../db/models";
import { ConflictException, ForbiddenException, NotFoundException } from "../../exceptions";
import { VerifiedProfileStatus } from "../../types/enums";
import { CreateVerifiedProfileDTO } from "./dto/create-verified-profile.dto";

export class VerifiedProfileService {

    public async create(userId: number, dto: CreateVerifiedProfileDTO) {
        const existing = await VerifiedProfile.findOne({ where: { user_id: userId } });

        if (existing) {
            throw new ConflictException("Ya existe un perfil de verificación para este usuario");
        }

        return VerifiedProfile.create({
            user_id: userId,
            legal_name: dto.legal_name,
            tax_id: dto.tax_id,
            document_url: dto.document_url,
            entity_type: dto.entity_type,
            status: VerifiedProfileStatus.PENDING,
        });
    }

    public async findMine(userId: number) {
        const profile = await VerifiedProfile.findOne({ where: { user_id: userId } });

        if (!profile) {
            throw new NotFoundException("No tienes un perfil de verificación");
        }

        return profile;
    }

    public async listAll() {
        return VerifiedProfile.findAll({ order: [["created_at", "DESC"]] });
    }

    public async updateStatus(profileId: number, status: VerifiedProfileStatus) {
        const profile = await VerifiedProfile.findByPk(profileId);

        if (!profile) {
            throw new NotFoundException("Perfil de verificación no encontrado");
        }

        if (profile.status === VerifiedProfileStatus.APPROVED && status === VerifiedProfileStatus.APPROVED) {
            throw new ConflictException("El perfil ya está aprobado");
        }

        await profile.update({ status });

        return profile;
    }
}
