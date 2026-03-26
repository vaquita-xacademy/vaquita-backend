export default {
    // 400
    BadRequestResponse: {
        description: "Solicitud invalida",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/FailureValidationSchema"
                },
                examples: {
                    BadRequest: {
                        $ref: "#/components/examples/BadRequestExample"
                    },
                }
            },
        }
    },
    // 401
    UnauthorizedResponse: {
        description: "No autenticado",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/FailureSchema"
                },
                examples: {
                    Unauthorized: {
                        $ref: "#/components/examples/UnauthorizedExample"
                    },
                    NoAuthToken: {
                        $ref: "#/components/examples/NoAuthTokenExample"
                    },
                    TokenExpired: {
                        $ref: "#/components/examples/TokenExpiredExample"
                    },
                }
            },
        }
    },
    // 403
    ForbiddenResponse: {
        description: "No permitido",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/FailureSchema"
                },
                examples: {
                    BadRequest: {
                        $ref: "#/components/examples/ForbiddenExample"
                    },
                }
            },
        }
    },
    // 404
    ModelNotFoundResponse: {
        description: "No se encontró el recurso",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/FailureSchema"
                },
                examples: {
                    BadRequest: {
                        $ref: "#/components/examples/ModelNotFoundExample"
                    },
                }
            },
        }
    },
    // 422
    UnprocessableEntityResponse: {
        description: "No se puede procesar la entidad",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/FailureSchema"
                },
                examples: {
                    BadRequest: {
                        $ref: "#/components/examples/UnprocessableEntityExample"
                    },
                }
            },
        }
    },
    // 500
    InternalServerErrorResponse: {
        description: "Error interno del servidor",
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/FailureSchema"
                },
                examples: {
                    BadRequest: {
                        $ref: "#/components/examples/InternalServerErrorExample"
                    },
                }
            },
        }
    },
}