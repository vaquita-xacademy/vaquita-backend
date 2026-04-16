export default {
    CreateCategoryRequestSchema: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nombre de la categoría",
                example: "Educación",
            }
        },
        required: [
            "name",
        ],
    },
}