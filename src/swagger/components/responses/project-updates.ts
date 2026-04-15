export default {
    ListProjectUpdatesSuccessResponse: {
        description: "Lista de actualizaciones",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/ListProjectUpdatesSuccessExample"
                    },
                },
            },
        }
    },
    CreateProjectUpdateSuccessResponse: {
        description: "Actualización creada",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/CreateProjectUpdateSuccessExample"
                    },
                },
            },
        }
    },
    UpdateProjectUpdateSuccessResponse: {
        description: "Actualización actualizada",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/UpdateProjectUpdateSuccessExample"
                    },
                },
            },
        }
    },
}