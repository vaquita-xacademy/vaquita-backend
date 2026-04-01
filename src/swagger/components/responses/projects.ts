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
}