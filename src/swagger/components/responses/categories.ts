export default {
    CreateCategorySuccessResponse: {
        description: "Categoría creada exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/CreateCategorySuccessExample"
                    },
                },
            },
        }
    },
    ListCategoriesSuccessResponse: {
        description: "Categorías obtenidas exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/ListCategoriesSuccessExample"
                    },
                },
            },
        }
    },
    DeleteCategorySuccessResponse: {
        description: "Categoría eliminada exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/DeleteCategorySuccessExample"
                    },
                },
            },
        }
    },
    
}