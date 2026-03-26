export default {
    SuccessSchema: {
        description: "Solicitud exitosa",
        type: "object",
        properties: {
            data: { type: "object" },
        },
    },
    FailureSchema: {
        description: "Solicitud fallida",
        type: "object",
        properties: {
            message: { type: "string" },
        },
    },
    FailureValidationSchema: {
        description: "Solicitud fallida por validacion",
        type: "object",
        properties: {
            message: { type: "string" },
            errors: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        field: { type: "string", example: "email" },
                        message: { type: "string", example: "El campo es requerido" }
                    }
                }
            }
        },
    },
}