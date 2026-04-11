const cookieAuth = [{ cookieAuth: [] }];

const commonErrorResponses = {
    "400": { $ref: "#/components/responses/BadRequestResponse" },
    "401": { $ref: "#/components/responses/UnauthorizedResponse" },
    "403": { $ref: "#/components/responses/ForbiddenResponse" },
    "404": { $ref: "#/components/responses/ModelNotFoundResponse" },
    "500": { $ref: "#/components/responses/InternalServerErrorResponse" },
};

export default {
    "/api/v1/verified-profiles": {
        post: {
            summary: "Enviar perfil de verificación",
            description: "El owner envía su perfil de verificación personal. Queda en estado `pending` hasta que un admin lo apruebe.",
            tags: ["Verified Profiles"],
            security: cookieAuth,
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/CreateVerifiedProfileRequestSchema" },
                    },
                },
            },
            responses: {
                "201": { $ref: "#/components/responses/CreateVerifiedProfileSuccessResponse" },
                ...commonErrorResponses,
            },
        },
        get: {
            summary: "Listar todos los perfiles (admin)",
            description: "Solo accesible por administradores. Devuelve todos los perfiles de verificación.",
            tags: ["Verified Profiles"],
            security: cookieAuth,
            responses: {
                "200": { $ref: "#/components/responses/ListVerifiedProfilesSuccessResponse" },
                "401": commonErrorResponses["401"],
                "403": commonErrorResponses["403"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/verified-profiles/mine": {
        get: {
            summary: "Ver mi perfil de verificación",
            description: "Devuelve el perfil de verificación del usuario autenticado.",
            tags: ["Verified Profiles"],
            security: cookieAuth,
            responses: {
                "200": { $ref: "#/components/responses/GetVerifiedProfileSuccessResponse" },
                "401": commonErrorResponses["401"],
                "404": commonErrorResponses["404"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/verified-profiles/{id}/status": {
        patch: {
            summary: "Aprobar o rechazar un perfil (admin)",
            description: "Solo accesible por administradores. Cambia el estado del perfil de verificación.",
            tags: ["Verified Profiles"],
            security: cookieAuth,
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: { type: "integer", example: 1 },
                    description: "ID del perfil de verificación",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UpdateVerifiedProfileStatusRequestSchema" },
                    },
                },
            },
            responses: {
                "200": { $ref: "#/components/responses/UpdateVerifiedProfileStatusSuccessResponse" },
                "400": commonErrorResponses["400"],
                "401": commonErrorResponses["401"],
                "403": commonErrorResponses["403"],
                "404": commonErrorResponses["404"],
                "500": commonErrorResponses["500"],
            },
        },
    },
}
