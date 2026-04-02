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
    },
    "/api/v1/auth/login": {
        post: {
            summary: "Iniciar sesión",
            description: "Ingreso de credenciales para acceder a la aplicación",
            tags: ["Authentication"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/LoginRequestSchema"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    $ref: "#/components/responses/LoginSuccessResponse"
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
                },
                "401": {
                    $ref: "#/components/responses/InvalidCredentialsResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            }
        }
    },
    "/api/v1/auth/me": {
        get: {
            summary: "Obtener información del usuario",
            description: "Obtiene la información del usuario autenticado",
            tags: ["Authentication"],
            security: [
                {
                    cookieAuth: []
                }
            ],
            responses: {
                "200": {
                    $ref: "#/components/responses/SessionSuccessResponse"
                },
                "401": {
                    $ref: "#/components/responses/UnauthorizedResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            }
        }
    },
    "/api/v1/auth/logout": {
        post: {
            summary: "Cerrar sesión",
            description: "Cierra la sesión del usuario",
            tags: ["Authentication"],
            security: [
                {
                    cookieAuth: []
                }
            ],
            responses: {
                "200": {
                    $ref: "#/components/responses/LogoutSuccessResponse"
                },
                "401": {
                    $ref: "#/components/responses/UnauthorizedResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            }
        }
    },
}