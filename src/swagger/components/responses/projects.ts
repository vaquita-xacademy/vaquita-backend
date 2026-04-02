export default {
    CreateProjectSuccessResponse: {
        description: "Proyecto creado exitosamente",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/CreateProjectSuccessExample" } },
            },
        },
    },

    GetPaginateProjectsSuccessResponse: {
        description: "Proyectos listados",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/ListPaginateProjectsSuccessExample" } },
            },
        },
    },

    GetProjectBySlugSuccessResponse: {
        description: "Detalle del proyecto",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/GetProjectBySlugSuccessExample" } },
            },
        },
    },

    ListMineProjectsSuccessResponse: {
        description: "Mis proyectos",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/ListMineProjectsSuccessExample" } },
            },
        },
    },

    UpdateProjectSuccessResponse: {
        description: "Proyecto actualizado",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/UpdateProjectSuccessExample" } },
            },
        },
    },

    UpdateProjectStatusSuccessResponse: {
        description: "Estado del proyecto actualizado",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/UpdateProjectStatusSuccessExample" } },
            },
        },
    },
}
