const cookieAuth = [{ cookieAuth: [] }];

const commonErrorResponses = {
    "400": { $ref: "#/components/responses/BadRequestResponse" },
    "401": { $ref: "#/components/responses/UnauthorizedResponse" },
    "403": { $ref: "#/components/responses/ForbiddenResponse" },
    "404": { $ref: "#/components/responses/ModelNotFoundResponse" },
    "500": { $ref: "#/components/responses/InternalServerErrorResponse" },
};

const idParam = {
    in: "path",
    name: "id",
    required: true,
    schema: { type: "integer", example: 1 },
    description: "ID de la organización",
};

export default {
    "/api/v1/organizations": {
        post: {
            summary: "Crear organización",
            description: "El owner crea una nueva organización. Un owner puede tener múltiples organizaciones.",
            tags: ["Organizations"],
            security: cookieAuth,
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/CreateOrganizationRequestSchema" },
                    },
                },
            },
            responses: {
                "201": { $ref: "#/components/responses/CreateOrganizationSuccessResponse" },
                ...commonErrorResponses,
            },
        },
        get: {
            summary: "Listar todas las organizaciones (admin)",
            description: "Solo accesible por administradores. Incluye estado de verificación de cada org.",
            tags: ["Organizations"],
            security: cookieAuth,
            responses: {
                "200": { $ref: "#/components/responses/ListAllOrganizationsSuccessResponse" },
                "401": commonErrorResponses["401"],
                "403": commonErrorResponses["403"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/organizations/mine": {
        get: {
            summary: "Mis organizaciones",
            description: "Devuelve todas las organizaciones del owner autenticado con su estado de verificación.",
            tags: ["Organizations"],
            security: cookieAuth,
            responses: {
                "200": { $ref: "#/components/responses/ListMyOrganizationsSuccessResponse" },
                "401": commonErrorResponses["401"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/organizations/{id}": {
        get: {
            summary: "Detalle de una organización",
            description: "Endpoint público. Devuelve el detalle de la organización con su estado de verificación.",
            tags: ["Organizations"],
            parameters: [idParam],
            responses: {
                "200": { $ref: "#/components/responses/GetOrganizationSuccessResponse" },
                "404": commonErrorResponses["404"],
                "500": commonErrorResponses["500"],
            },
        },
        patch: {
            summary: "Editar organización",
            description: "Solo el owner de la organización puede editarla. Todos los campos son opcionales.",
            tags: ["Organizations"],
            security: cookieAuth,
            parameters: [idParam],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UpdateOrganizationRequestSchema" },
                    },
                },
            },
            responses: {
                "200": { $ref: "#/components/responses/UpdateOrganizationSuccessResponse" },
                ...commonErrorResponses,
            },
        },
    },

    "/api/v1/organizations/{id}/verification": {
        post: {
            summary: "Enviar verificación de organización",
            description: "El owner de la org envía su perfil de verificación. Solo puede enviarse una vez.",
            tags: ["Organizations"],
            security: cookieAuth,
            parameters: [idParam],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/CreateOrgVerificationRequestSchema" },
                    },
                },
            },
            responses: {
                "201": { $ref: "#/components/responses/CreateOrgVerificationSuccessResponse" },
                ...commonErrorResponses,
            },
        },
        get: {
            summary: "Ver verificación de organización",
            description: "Accesible por el owner de la org o un admin.",
            tags: ["Organizations"],
            security: cookieAuth,
            parameters: [idParam],
            responses: {
                "200": { $ref: "#/components/responses/GetOrgVerificationSuccessResponse" },
                "401": commonErrorResponses["401"],
                "403": commonErrorResponses["403"],
                "404": commonErrorResponses["404"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/organizations/{id}/verification/status": {
        patch: {
            summary: "Aprobar o rechazar verificación (admin)",
            description: "Solo accesible por administradores.",
            tags: ["Organizations"],
            security: cookieAuth,
            parameters: [idParam],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UpdateOrgVerificationStatusRequestSchema" },
                    },
                },
            },
            responses: {
                "200": { $ref: "#/components/responses/UpdateOrgVerificationStatusSuccessResponse" },
                "400": commonErrorResponses["400"],
                "401": commonErrorResponses["401"],
                "403": commonErrorResponses["403"],
                "404": commonErrorResponses["404"],
                "500": commonErrorResponses["500"],
            },
        },
    },
}
