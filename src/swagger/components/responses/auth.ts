export default {
    RegisterSuccessResponse: {
        description: "Registro exitoso",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/RegisterSuccessExample"
                    },
                },
            },
        }
    },
    LoginSuccessResponse: {
        description: "Login exitoso",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/LoginSuccessExample"
                    },
                },
            },
        }
    },
    InvalidCredentialsResponse: {
        description: "Credenciales invalidas",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/FailureSchema"
                },
                examples: {
                    InvalidCredentials: {
                        $ref: "#/components/examples/InvalidCredentialsExample"
                    },
                },
            },
        }
    },
    SessionSuccessResponse: {
        description: "Usuario obtenido exitosamente",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/SessionSuccessExample"
                    },
                },
            },
        }
    },
    LogoutSuccessResponse: {
        description: "Logout exitoso",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SuccessSchema"
                },
                examples: {
                    success: {
                        $ref: "#/components/examples/LogoutSuccessExample"
                    },
                },
            },
        }
    },
}