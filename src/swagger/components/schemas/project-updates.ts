export default {
    CreateProjectUpdateSchema: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "Actualización 1"
            },
            description: {
                type: "string",
                example: "Descripción 1"
            },
            receipt: {
                type: "string",
                format: "binary",
                description: "Recibo o fotografía de la actualización"
            }
        },
        required: ["title", "description", "receipt"]
    },
    UpdateProjectUpdateSchema: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "Actualización 1"
            },
            description: {
                type: "string",
                example: "Descripción 1"
            },
            receipt: {
                type: "string",
                format: "binary",
                description: "Recibo o fotografía de la actualización"
            }
        }
    },
}