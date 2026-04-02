const cookieAuth = [{ cookieAuth: [] }];

const commonErrorResponses = {
    "400": { $ref: "#/components/responses/BadRequestResponse" },
    "401": { $ref: "#/components/responses/UnauthorizedResponse" },
    "403": { $ref: "#/components/responses/ForbiddenResponse" },
    "404": { $ref: "#/components/responses/ModelNotFoundResponse" },
    "500": { $ref: "#/components/responses/InternalServerErrorResponse" },
};

const paginationParams = [
    {
        in: "query",
        name: "limit",
        required: true,
        schema: { type: "integer", minimum: 1, example: 10 },
        description: "Cantidad de resultados por página.",
    },
    {
        in: "query",
        name: "after",
        schema: { type: "string", description: "Cursor para la página siguiente." },
    },
    {
        in: "query",
        name: "before",
        schema: { type: "string", description: "Cursor para la página anterior." },
    },
    {
        in: "query",
        name: "sort",
        schema: {
            type: "string",
            enum: ["newest", "oldest", "title_asc", "title_desc"],
            description: "Ordenamiento.",
        },
    },
    {
        in: "query",
        name: "status",
        schema: {
            type: "string",
            enum: ["active", "paused", "completed", "cancelled"],
            description: "Filtrar por estado.",
        },
    },
    {
        in: "query",
        name: "search",
        schema: { type: "string", description: "Buscar por título (parcial)." },
    },
];

export default {
    "/api/v1/projects": {
        post: {
            summary: "Crear un proyecto",
            description: "Requiere owner con perfil de usuario aprobado. Si se provee `organization_id`, la org también debe estar aprobada y ser del owner.",
            tags: ["Projects"],
            security: cookieAuth,
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/CreateProjectRequestSchema" },
                    },
                },
            },
            responses: {
                "201": { $ref: "#/components/responses/CreateProjectSuccessResponse" },
                ...commonErrorResponses,
            },
        },
        get: {
            summary: "Listar proyectos (público)",
            description: "Devuelve proyectos paginados con cursor. No requiere autenticación.",
            tags: ["Projects"],
            parameters: [
                ...paginationParams,
                {
                    in: "query",
                    name: "category_id",
                    schema: { type: "integer", minimum: 1, description: "Filtrar por categoría." },
                },
            ],
            responses: {
                "200": { $ref: "#/components/responses/GetPaginateProjectsSuccessResponse" },
                "400": commonErrorResponses["400"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/projects/mine": {
        get: {
            summary: "Mis proyectos",
            description: "Lista paginada de proyectos del owner autenticado. Incluye todos los campos del proyecto.",
            tags: ["Projects"],
            security: cookieAuth,
            parameters: paginationParams,
            responses: {
                "200": { $ref: "#/components/responses/ListMineProjectsSuccessResponse" },
                "400": commonErrorResponses["400"],
                "401": commonErrorResponses["401"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/projects/{slug}": {
        get: {
            summary: "Detalle de un proyecto (público)",
            description: "Devuelve el detalle completo de un proyecto por su slug.",
            tags: ["Projects"],
            parameters: [
                {
                    in: "path",
                    name: "slug",
                    required: true,
                    schema: { type: "string", example: "huerta-comunitaria-sur-482" },
                    description: "Slug único del proyecto.",
                },
            ],
            responses: {
                "200": { $ref: "#/components/responses/GetProjectBySlugSuccessResponse" },
                "404": commonErrorResponses["404"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/projects/{id}": {
        patch: {
            summary: "Editar un proyecto",
            description: "Solo el owner del proyecto o un admin pueden editarlo. Todos los campos son opcionales.",
            tags: ["Projects"],
            security: cookieAuth,
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: { type: "integer", example: 1 },
                    description: "ID del proyecto.",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UpdateProjectRequestSchema" },
                    },
                },
            },
            responses: {
                "200": { $ref: "#/components/responses/UpdateProjectSuccessResponse" },
                ...commonErrorResponses,
            },
        },
    },

    "/api/v1/projects/{id}/status": {
        patch: {
            summary: "Cambiar estado de un proyecto",
            description: "Solo el owner del proyecto o un admin pueden cambiar el estado.",
            tags: ["Projects"],
            security: cookieAuth,
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: { type: "integer", example: 1 },
                    description: "ID del proyecto.",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UpdateProjectStatusRequestSchema" },
                    },
                },
            },
            responses: {
                "200": { $ref: "#/components/responses/UpdateProjectStatusSuccessResponse" },
                ...commonErrorResponses,
            },
        },
    },
}
