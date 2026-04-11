import { Organization } from "../../../db/models";
import { OrganizationVerifiedProfile } from "../../../db/models";

export class OrganizationResource {
    static toResponse(org: Organization) {
        return {
            id: org.id,
            owner_id: org.owner_id,
            name: org.name,
            description: org.description ?? null,
            logo_url: org.logo_url ?? null,
            created_at: org.created_at,
            updated_at: org.updated_at,
        };
    }

    static toResponseWithVerification(org: Organization) {
        const vp = org.verified_profile as OrganizationVerifiedProfile | undefined;
        return {
            ...OrganizationResource.toResponse(org),
            verification: vp ? {
                id: vp.id,
                status: vp.status,
                entity_type: vp.entity_type,
                legal_name: vp.legal_name,
                tax_id: vp.tax_id,
            } : null,
        };
    }
}
