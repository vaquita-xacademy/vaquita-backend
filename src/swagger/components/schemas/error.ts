export default {
    ValidationErrorSchema: {
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