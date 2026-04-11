const cookieAuth = [{ cookieAuth: [] }];

const commonErrorResponses = {
    "400": { $ref: "#/components/responses/BadRequestResponse" },
    "401": { $ref: "#/components/responses/UnauthorizedResponse" },
    "403": { $ref: "#/components/responses/ForbiddenResponse" },
    "404": { $ref: "#/components/responses/ModelNotFoundResponse" },
    "500": { $ref: "#/components/responses/InternalServerErrorResponse" },
};

export default {
    "/api/v1/donations": {
        post: {
            summary: "Crear una donación",
            description: "El usuario autenticado dona a un proyecto activo. La donación es permanente e incrementa el `current_amount` del proyecto de forma atómica.",
            tags: ["Donations"],
            security: cookieAuth,
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/CreateDonationRequestSchema" },
                    },
                },
            },
            responses: {
                "201": { $ref: "#/components/responses/CreateDonationSuccessResponse" },
                ...commonErrorResponses,
            },
        },
    },

    "/api/v1/donations/mine": {
        get: {
            summary: "Mi historial de donaciones",
            description: "Devuelve todas las donaciones realizadas por el donor autenticado, con info del proyecto. No expone información de otros donors.",
            tags: ["Donations"],
            security: cookieAuth,
            responses: {
                "200": { $ref: "#/components/responses/ListMineDonationsSuccessResponse" },
                "401": commonErrorResponses["401"],
                "500": commonErrorResponses["500"],
            },
        },
    },

    "/api/v1/projects/{id}/donations": {
        get: {
            summary: "Donaciones de un proyecto (owner/admin)",
            description: "Solo el owner del proyecto o un admin pueden ver quiénes donaron y cuánto.",
            tags: ["Donations"],
            security: cookieAuth,
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: { type: "integer", example: 1 },
                    description: "ID del proyecto",
                },
            ],
            responses: {
                "200": { $ref: "#/components/responses/ListProjectDonationsSuccessResponse" },
                "401": commonErrorResponses["401"],
                "403": commonErrorResponses["403"],
                "404": commonErrorResponses["404"],
                "500": commonErrorResponses["500"],
            },
        },
    },
}
