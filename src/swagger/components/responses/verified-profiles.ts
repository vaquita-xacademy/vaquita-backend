export default {
    CreateVerifiedProfileSuccessResponse: {
        description: "Perfil de verificación creado exitosamente",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: {
                    success: { $ref: "#/components/examples/CreateVerifiedProfileSuccessExample" },
                },
            },
        },
    },

    GetVerifiedProfileSuccessResponse: {
        description: "Perfil de verificación obtenido",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: {
                    success: { $ref: "#/components/examples/GetVerifiedProfileSuccessExample" },
                },
            },
        },
    },

    ListVerifiedProfilesSuccessResponse: {
        description: "Lista de perfiles de verificación",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: {
                    success: { $ref: "#/components/examples/ListVerifiedProfilesSuccessExample" },
                },
            },
        },
    },

    UpdateVerifiedProfileStatusSuccessResponse: {
        description: "Estado del perfil actualizado",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: {
                    success: { $ref: "#/components/examples/UpdateVerifiedProfileStatusSuccessExample" },
                },
            },
        },
    },
}
