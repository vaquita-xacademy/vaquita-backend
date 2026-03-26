export default {
    "/api/v1/auth/register": {
        post: {
            summary: "Registrar un nuevo usuario",
            description: "Crea una nueva cuenta de usuario",
            tags: ["Authentication"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RegisterUserRequestSchema"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    $ref: "#/components/responses/RegisterSuccessResponse"
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },

            }
        }
    }
}