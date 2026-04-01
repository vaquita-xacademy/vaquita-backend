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
    ListProjectsSuccessResponse: {
        description: "Proyectos listados exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/ListProjectsSuccessExample"
                    },
                },
            },
        }
    },
}