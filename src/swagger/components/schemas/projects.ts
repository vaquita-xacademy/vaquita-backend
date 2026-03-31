export default {
    CreateProjectRequestSchema: {
        type: "object",
        properties: {
            title: {
                type: "string",
                description: "Nombre del proyecto",
                example: "Reforestación del Bosque Local",
            },
            description: {
                type: "string",
                description: "Descripción del proyecto",
                example: "Proyecto para reforestar áreas degradadas del bosque local y promover educación ambiental.",
            },
            goal_amount: {
                type: "number",
                description: "Monto objetivo del proyecto",
                example: 1000,
            },
            image_url: {
                type: "string",
                format: "url",
                description: "URL de la imagen del proyecto",
                example: "https://example.com/image.jpg",
            },
            category_id: {
                type: "integer",
                description: "ID de la categoría del proyecto",
                example: 1,
            },
            location: {
                type: "object",
                properties: {
                    province: {
                        type: "string",
                        description: "Provincia del proyecto",
                        example: "Mendoza",
                    },
                    city: {
                        type: "string",
                        description: "Ciudad del proyecto",
                        example: "Mendoza",
                    },
                },
                required: [
                    "province",
                    "city",
                ],
            },
        },
        required: [
            "title",
            "description",
            "goal_amount",
            "image_url",
            "category_id",
            "location",
        ],
    },
}