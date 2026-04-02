import { VerifiedProfile } from "../../../db/models";

export class VerifiedProfileResource {
    static toResponse(profile: VerifiedProfile) {
        return {
            id: profile.id,
            user_id: profile.user_id,
            legal_name: profile.legal_name,
            tax_id: profile.tax_id,
            document_url: profile.document_url,
            entity_type: profile.entity_type,
            status: profile.status,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
        };
    }
}
