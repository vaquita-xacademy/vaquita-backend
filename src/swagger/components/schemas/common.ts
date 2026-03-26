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
            errors: { type: "array" }
        },
    },
}