import { Organization, OrganizationVerifiedProfile } from "../../db/models";
import {
    ConflictException,
    ForbiddenException,
    NotFoundException,
} from "../../exceptions";
import { VerifiedProfileStatus } from "../../types/enums";
import { CreateOrganizationDTO } from "./dto/create-organization.dto";
import { UpdateOrganizationDTO } from "./dto/update-organization.dto";
import { CreateOrgVerificationDTO } from "./dto/create-org-verification.dto";

export class OrganizationService {

    public async create(ownerId: number, dto: CreateOrganizationDTO) {
        return Organization.create({
            owner_id: ownerId,
            name: dto.name,
            description: dto.description ?? null,
            logo_url: dto.logo_url ?? null,
        });
    }

    public async listMine(ownerId: number) {
        return Organization.findAll({
            where: { owner_id: ownerId },
            include: [{ model: OrganizationVerifiedProfile, as: "verified_profile" }],
            order: [["created_at", "DESC"]],
        });
    }

    public async findById(orgId: number) {
        const org = await Organization.findByPk(orgId, {
            include: [{ model: OrganizationVerifiedProfile, as: "verified_profile" }],
        });

        if (!org) {
            throw new NotFoundException("Organización no encontrada");
        }

        return org;
    }

    public async update(orgId: number, ownerId: number, dto: UpdateOrganizationDTO) {
        const org = await Organization.findByPk(orgId);

        if (!org) {
            throw new NotFoundException("Organización no encontrada");
        }

        if (org.owner_id !== ownerId) {
            throw new ForbiddenException("No tienes permiso para editar esta organización");
        }

        await org.update(dto);
        return org;
    }

    public async createVerification(orgId: number, ownerId: number, dto: CreateOrgVerificationDTO) {
        const org = await Organization.findByPk(orgId);

        if (!org) {
            throw new NotFoundException("Organización no encontrada");
        }

        if (org.owner_id !== ownerId) {
            throw new ForbiddenException("No tienes permiso para verificar esta organización");
        }

        const existing = await OrganizationVerifiedProfile.findOne({
            where: { organization_id: orgId },
        });

        if (existing) {
            throw new ConflictException("Esta organización ya tiene un perfil de verificación");
        }

        return OrganizationVerifiedProfile.create({
            organization_id: orgId,
            legal_name: dto.legal_name,
            tax_id: dto.tax_id,
            document_url: dto.document_url,
            entity_type: dto.entity_type,
            status: VerifiedProfileStatus.PENDING,
        });
    }

    public async getVerification(orgId: number, requesterId: number, requesterIsAdmin: boolean) {
        const org = await Organization.findByPk(orgId);

        if (!org) {
            throw new NotFoundException("Organización no encontrada");
        }

        if (!requesterIsAdmin && org.owner_id !== requesterId) {
            throw new ForbiddenException("No tienes permiso para ver esta verificación");
        }

        const vp = await OrganizationVerifiedProfile.findOne({
            where: { organization_id: orgId },
        });

        if (!vp) {
            throw new NotFoundException("Esta organización no tiene perfil de verificación");
        }

        return vp;
    }

    public async updateVerificationStatus(orgId: number, status: VerifiedProfileStatus) {
        const vp = await OrganizationVerifiedProfile.findOne({
            where: { organization_id: orgId },
        });

        if (!vp) {
            throw new NotFoundException("Perfil de verificación no encontrado para esta organización");
        }

        await vp.update({ status });
        return vp;
    }

    public async listAllWithVerification() {
        return Organization.findAll({
            include: [{ model: OrganizationVerifiedProfile, as: "verified_profile" }],
            order: [["created_at", "DESC"]],
        });
    }
}
