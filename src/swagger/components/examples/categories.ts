export default {
    CreateCategorySuccessExample: {
        summary: "Categoría creada exitosamente",
        value: {
            data: {
                category: {
                    id: 1,
                    name: "Comunidad",
                    created_at: "2025-12-17T17:00:00Z",
                    updated_at: "2025-12-17T17:00:00Z",
                }
            }
        },
    },
    ListCategoriesSuccessExample: {
        summary: "Categorías obtenidas exitosamente",
        value: {
            data: {
                categories: [
                    {
                        id: 1,
                        name: "Comunidad",
                        created_at: "2025-12-17T17:00:00Z",
                        updated_at: "2025-12-17T17:00:00Z",
                    },
                    {
                        id: 2,
                        name: "Educación",
                        created_at: "2025-12-17T17:00:00Z",
                        updated_at: "2025-12-17T17:00:00Z",
                    },
                ],
            }
        },
    },
    DeleteCategorySuccessExample: {
        summary: "Categoría eliminada exitosamente",
        value: {
            data: {
                message: "Categoría eliminada exitosamente",
            }
        },
    },
}