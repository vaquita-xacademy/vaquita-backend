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
            summary: "Listar todos los proyectos",
            description: "Endpoint para listar todos los proyectos",
            tags: ["Projects"],
            responses: {
                "200": {
                    $ref: "#/components/responses/ListProjectsSuccessResponse",
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            },
        },
    },
}

           