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
            budget_items: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/CreateBudgetItemRequestSchema",
                },
            },
        },
        required: [
            "title",
            "description",
            "goal_amount",
            "image_url",
            "category_id",
            "location",
            "budget_items",
        ],
    },
    CreateBudgetItemRequestSchema: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nombre del item del presupuesto",
                example: "Compra de plantines nativos",
            },
            quantity: {
                type: "number",
                description: "Cantidad del item del presupuesto",
                example: 1,
            },
        },
        required: [
            "name",
            "quantity",
        ],
    },
    UpdateProjectRequestSchema: {
        type: "object",
        properties: {
            title: {
                type: "string",
                description: "Nombre del proyecto",
                example: "Proyecto Actualizado",
            },
            description: {
                type: "string",
                description: "Descripción del proyecto",
                example: "Descripción actualizada del proyecto.",
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
                        example: "Entre Ríos",
                    },
                    city: {
                        type: "string",
                        description: "Ciudad del proyecto",
                        example: "Concordia",
                    },
                },
                required: [
                    "province",
                    "city",
                ],
            },
            budget_items: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/CreateBudgetItemRequestSchema",
                },
            },
        },
    },
    UpdateBudgetItemRequestSchema: {
        type: "object",
        properties: {
            id: {
                type: "integer",
                description: "ID del ítem existente. Si se omite, el ítem se creará como nuevo.",
                example: 1,
                nullable: true,
            },
            name: {
                type: "string",
                description: "Nombre del item del presupuesto",
                example: "Materiales",
            },
            quantity: {
                type: "number",
                description: "Cantidad del item del presupuesto",
                example: 1,
            },
        },
        required: [
            "name",
            "quantity",
        ],
    },
    UpdateProjectStatusRequestSchema: {
        type: "object",
        properties: {
            status: {
                type: "string",
                enum: ["active", "paused", "completed", "cancelled"],
                description: "Estado del proyecto.",
                example: "active",
            },
        },
        required: ["status",],
    },
}