export default {
    CreateOrganizationRequestSchema: {
        type: "object",
        properties: {
            name: {
                type: "string",
                maxLength: 100,
                description: "Nombre de la organización",
                example: "Fundación Verde",
            },
            description: {
                type: "string",
                description: "Descripción de la organización",
                example: "Organización dedicada a proyectos ecológicos en la región.",
            },
            logo_url: {
                type: "string",
                format: "url",
                description: "URL del logo",
                example: "https://example.com/logos/fundacion-verde.png",
            },
        },
        required: ["name"],
    },

    UpdateOrganizationRequestSchema: {
        type: "object",
        properties: {
            name: {
                type: "string",
                maxLength: 100,
                description: "Nombre de la organización",
                example: "Fundación Verde Actualizada",
            },
            description: {
                type: "string",
                description: "Descripción de la organización",
                example: "Nueva descripción.",
            },
            logo_url: {
                type: "string",
                format: "url",
                description: "URL del logo",
                example: "https://example.com/logos/nuevo-logo.png",
            },
        },
    },

    CreateOrgVerificationRequestSchema: {
        type: "object",
        properties: {
            legal_name: {
                type: "string",
                maxLength: 100,
                description: "Razón social de la organización",
                example: "Fundación Verde ONG",
            },
            tax_id: {
                type: "string",
                maxLength: 100,
                description: "CUIT de la organización",
                example: "30-99887766-5",
            },
            document_url: {
                type: "string",
                format: "url",
                description: "URL del estatuto o documento legal",
                example: "https://example.com/documentos/estatuto-fundacion.pdf",
            },
            entity_type: {
                type: "string",
                enum: ["individual", "legal"],
                description: "Tipo de entidad",
                example: "legal",
            },
        },
        required: ["legal_name", "tax_id", "document_url", "entity_type"],
    },

    UpdateOrgVerificationStatusRequestSchema: {
        type: "object",
        properties: {
            status: {
                type: "string",
                enum: ["pending", "approved", "rejected"],
                description: "Nuevo estado de la verificación",
                example: "approved",
            },
        },
        required: ["status"],
    },

    OrganizationSchema: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            owner_id: { type: "integer", example: 4 },
            name: { type: "string", example: "Fundación Verde" },
            description: { type: "string", nullable: true, example: "Organización dedicada a proyectos ecológicos." },
            logo_url: { type: "string", nullable: true, example: "https://example.com/logos/fundacion-verde.png" },
            created_at: { type: "string", format: "date-time", example: "2026-04-02T00:00:00.000Z" },
            updated_at: { type: "string", format: "date-time", example: "2026-04-02T00:00:00.000Z" },
        },
    },

    OrgVerificationSchema: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            organization_id: { type: "integer", example: 1 },
            legal_name: { type: "string", example: "Fundación Verde ONG" },
            tax_id: { type: "string", example: "30-99887766-5" },
            document_url: { type: "string", example: "https://example.com/documentos/estatuto-fundacion.pdf" },
            entity_type: { type: "string", enum: ["individual", "legal"], example: "legal" },
            status: { type: "string", enum: ["pending", "approved", "rejected"], example: "pending" },
            created_at: { type: "string", format: "date-time", example: "2026-04-02T00:00:00.000Z" },
            updated_at: { type: "string", format: "date-time", example: "2026-04-02T00:00:00.000Z" },
        },
    },
}
