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
                        enum: ["newest", "oldest", "title_asc", "title_desc", "progress_asc", "progress_desc"],
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
    "/api/v1/projects/{slug}": {
        get: {
            summary: "Obtener un proyecto por slug",
            description: "Endpoint para obtener un proyecto por slug",
            tags: ["Projects"],
            parameters: [
                {
                    in: "path",
                    name: "slug",
                    required: true,
                    schema: {
                        type: "string",
                        description: "Slug único del proyecto.",
                        example: "construccion-de-viviendas-105"
                    }
                }
            ],
            responses: {
                "200": {
                    $ref: "#/components/responses/ProjectBySlugSuccessResponse",
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
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
    "/api/v1/projects/{id}": {
        patch: {
            summary: "Actualizar un proyecto",
            description: "Endpoint para actualizar los datos de un proyecto existente identificado por su ID. Requiere autenticación y autorización.",
            tags: ["Projects"],
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "integer",
                        description: "ID del proyecto.",
                        example: 1
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UpdateProjectRequestSchema",
                        },
                    },
                },
            },
            responses: {
                "200": {
                    $ref: "#/components/responses/UpdateProjectSuccessResponse",
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
        delete: {
            summary: "Eliminar un proyecto",
            description: "Endpoint para eliminar un proyecto que no tenga donaciones. Requiere autenticación y autorización.",
            tags: ["Projects"],
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "integer",
                        description: "ID del proyecto.",
                        example: 1
                    }
                }
            ],
            responses: {
                "200": {
                    $ref: "#/components/responses/DeleteProjectSuccessResponse",
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

}

