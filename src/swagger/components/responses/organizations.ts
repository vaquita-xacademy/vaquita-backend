export default {
    CreateOrganizationSuccessResponse: {
        description: "Organización creada exitosamente",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/CreateOrganizationSuccessExample" } },
            },
        },
    },

    GetOrganizationSuccessResponse: {
        description: "Detalle de la organización",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/GetOrganizationSuccessExample" } },
            },
        },
    },

    ListMyOrganizationsSuccessResponse: {
        description: "Lista de mis organizaciones",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/ListMyOrganizationsSuccessExample" } },
            },
        },
    },

    ListAllOrganizationsSuccessResponse: {
        description: "Lista de todas las organizaciones",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/ListAllOrganizationsSuccessExample" } },
            },
        },
    },

    UpdateOrganizationSuccessResponse: {
        description: "Organización actualizada",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/UpdateOrganizationSuccessExample" } },
            },
        },
    },

    CreateOrgVerificationSuccessResponse: {
        description: "Verificación de organización enviada",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/CreateOrgVerificationSuccessExample" } },
            },
        },
    },

    GetOrgVerificationSuccessResponse: {
        description: "Verificación de la organización",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/GetOrgVerificationSuccessExample" } },
            },
        },
    },

    UpdateOrgVerificationStatusSuccessResponse: {
        description: "Estado de verificación actualizado",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/UpdateOrgVerificationStatusSuccessExample" } },
            },
        },
    },
}
