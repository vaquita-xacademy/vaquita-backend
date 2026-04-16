export default {
    "/api/v1/categories": {
        get: {
            summary: "Obtener todas las categorías",
            description: "Endpoint para obtener todas las categorías",
            tags: ["Categories"],
            responses: {
                "200": {
                    $ref: "#/components/responses/ListCategoriesSuccessResponse",
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            },
        },
        post: {
            summary: "Crear una nueva categoría",
            description: "Endpoint para crear una nueva categoría",
            tags: ["Categories"],
            security: [{ cookieAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateCategoryRequestSchema",
                        },
                    },
                },
            },
            responses: {
                "201": {
                    $ref: "#/components/responses/CreateCategorySuccessResponse",
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
                },
                "401": {
                    $ref: "#/components/responses/UnauthorizedResponse"
                },
                "403": {
                    $ref: "#/components/responses/ForbiddenResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            },
        },
    },
    "/api/v1/categories/{id}": {
        delete: {
        summary: "Eliminar una categoría",
        description: "Endpoint para eliminar una categoría",
        tags: ["Categories"],
        security: [{ cookieAuth: [] }],
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                schema: {
                    type: "integer",
                },
            },
        ],
        responses: {
            "200": {
                $ref: "#/components/responses/DeleteCategorySuccessResponse",
            },
            "400": {
                $ref: "#/components/responses/BadRequestResponse"
            },
            "401": {
                $ref: "#/components/responses/UnauthorizedResponse"
            },
            "403": {
                $ref: "#/components/responses/ForbiddenResponse"
            },
            "404": {
                $ref: "#/components/responses/ModelNotFoundResponse"
            },
            "500": {
                $ref: "#/components/responses/InternalServerErrorResponse"
            },
        },
       },
       
    },
}