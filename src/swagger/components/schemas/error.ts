export default {
    ErrorResponseSchema: {
        type: "object",
        properties: {
            message: { type: "string", example: "Mensaje de error" },
        },
    },
    ValidationErrorSchema: {
        type: "object",
        properties: {
            message: { type: "string", example: "Errores de validación" },
            errors: {
                type: "array",
                description: "Listado de errores de validación",
                items: {
                    type: "object",
                    properties: {
                        field: {
                            type: "string",
                            example: "email",
                        },
                        message: {
                            type: "string",
                            example: "Es requerido",
                        },
                    },
                },
            }
        },
    },
}