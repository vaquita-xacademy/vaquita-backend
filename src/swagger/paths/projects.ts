export default {
    "/api/v1/projects": {
        post: {
            summary: "Crear un nuevo proyecto",
            description: "Endpoint para crear un nuevo proyecto",
            tags: ["Projects"],
            security: [{ cookieAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateProjectRequestSchema",
                        },
                    },
                },
            },
            responses: {
                "201": {
                    $ref: "#/components/responses/CreateProjectSuccessResponse",
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
        get: {
            summary: "Listar proyectos",
            description: "Endpoint para listar todos los proyectos",
            tags: ["Projects"],
            parameters: [
                {
                    in: "query",
                    name: "limit",
                    required: true,
                    schema: {
                        type: "integer",
                        minimum: 1,
                        description: "Cantidad de resultados a devolver por página.",
                        example: 3
                    }
                },
                {
                    in: "query",
                    name: "after",
                    schema: {
                        type: "string",
                        description: "Cursor para obtener la siguiente página."
                    }
                },
                {
                    in: "query",
                    name: "before",
                    schema: {
                        type: "string",
                        description: "Cursor para obtener la página anterior."
                    }
                },
                {
                    in: "query",
                    name: "sort",
                    schema: {
                        type: "string",
                        enum: ["newest", "oldest", "title_asc", "title_desc"],
                        description: "Opcion para ordenar el listado"
                    }
                },
                {
                    in: "query",
                    name: "category_id",
                    schema: {
                        type: "integer",
                        minimum: 1,
                        description: "ID de la categoria."
                    }
                },
                {
                    in: "query",
                    name: "search",
                    schema: {
                        type: "string",
                        minimum: 1,
                        description: "Palabra para filtrar."
                    }
                },
                {
                    in: "query",
                    name: "status",
                    schema: {
                        type: "string",
                        enum: ["active", "paused", "completed", "cancelled"],
                        description: "Estado del proyecto.",
                    }
                },

            ],
            responses: {
                "200": {
                    $ref: "#/components/responses/GetPaginateProjectsSuccessResponse",
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
                },
                "401": {
                    $ref: "#/components/responses/UnauthorizedResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            },
        },
    },

}

