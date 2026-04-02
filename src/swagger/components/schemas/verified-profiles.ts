export default {
    CreateVerifiedProfileRequestSchema: {
        type: "object",
        properties: {
            legal_name: {
                type: "string",
                maxLength: 100,
                description: "Nombre legal del titular",
                example: "Maria Lopez",
            },
            tax_id: {
                type: "string",
                maxLength: 100,
                description: "CUIT/CUIL del titular",
                example: "20-12345678-9",
            },
            document_url: {
                type: "string",
                format: "url",
                description: "URL del documento de identidad o constancia",
                example: "https://example.com/documentos/dni-maria.pdf",
            },
            entity_type: {
                type: "string",
                enum: ["individual", "legal"],
                description: "Tipo de entidad",
                example: "individual",
            },
        },
        required: ["legal_name", "tax_id", "document_url", "entity_type"],
    },

    VerifiedProfileSchema: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            user_id: { type: "integer", example: 4 },
            legal_name: { type: "string", example: "Maria Lopez" },
            tax_id: { type: "string", example: "20-12345678-9" },
            document_url: { type: "string", example: "https://example.com/documentos/dni-maria.pdf" },
            entity_type: { type: "string", enum: ["individual", "legal"], example: "individual" },
            status: { type: "string", enum: ["pending", "approved", "rejected"], example: "pending" },
            created_at: { type: "string", format: "date-time", example: "2026-04-02T00:00:00.000Z" },
            updated_at: { type: "string", format: "date-time", example: "2026-04-02T00:00:00.000Z" },
        },
    },

    UpdateVerifiedProfileStatusRequestSchema: {
        type: "object",
        properties: {
            status: {
                type: "string",
                enum: ["pending", "approved", "rejected"],
                description: "Nuevo estado del perfil",
                example: "approved",
            },
        },
        required: ["status"],
    },
}
