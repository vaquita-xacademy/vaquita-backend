export default {
    CreateProjectSuccessResponse: {
        description: "Proyecto creado exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/CreateProjectSuccessExample"
                    },
                },
            },
        }
    },
    GetPaginateProjectsSuccessResponse: {
        description: "Proyectos listados",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/ListPaginateProjectsSuccessExample"
                    },
                },
            },
        }
    },
    ProjectBySlugSuccessResponse: {
        description: "Proyecto obtenido exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/ProjectBySlugSuccessExample"
                    },
                },
            },
        }
    },
    UpdateProjectSuccessResponse: {
        description: "Proyecto actualizado exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/UpdateProjectSuccessExample"
                    },
                },
            },
        }
    },
    DeleteProjectSuccessResponse: {
        description: "Proyecto eliminado exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/DeleteProjectSuccessExample"
                    },
                },
            },
        }
    },
    ListMineProjectsSuccessResponse: {
        description: "Mis proyectos",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/ListMineProjectsSuccessExample"
                    },
                },
            },
        }
    },
    UpdateProjectStatusSuccessResponse: {
        description: "Estado del proyecto actualizado exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/UpdateProjectStatusSuccessExample"
                    },
                },
            },
        }
    },
}