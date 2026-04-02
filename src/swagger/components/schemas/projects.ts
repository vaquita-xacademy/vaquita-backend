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
                required: ["province", "city"],
            },
            organization_id: {
                type: "integer",
                nullable: true,
                description: "ID de la organización (opcional). Si se provee, la org debe estar verificada y aprobada.",
                example: 1,
            },
        },
        required: ["title", "description", "goal_amount", "image_url", "category_id", "location"],
    },

    UpdateProjectRequestSchema: {
        type: "object",
        description: "Todos los campos son opcionales — solo enviar lo que se quiere cambiar.",
        properties: {
            title: { type: "string", example: "Nuevo título del proyecto" },
            description: { type: "string", example: "Nueva descripción." },
            goal_amount: { type: "number", example: 200000 },
            image_url: { type: "string", format: "url", example: "https://example.com/nueva-imagen.jpg" },
            category_id: { type: "integer", example: 3 },
            location: {
                type: "object",
                properties: {
                    province: { type: "string", example: "Córdoba" },
                    city: { type: "string", example: "Villa Carlos Paz" },
                },
            },
        },
    },

    UpdateProjectStatusRequestSchema: {
        type: "object",
        properties: {
            status: {
                type: "string",
                enum: ["active", "paused", "completed", "cancelled"],
                description: "Nuevo estado del proyecto",
                example: "paused",
            },
        },
        required: ["status"],
    },
}
