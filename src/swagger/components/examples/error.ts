export default {
    // 400
    BadRequestExample: {
        summary: "Solicitud invalida",
        value: {
            message: "Errores de validación",
            errors: [
                {
                    field: "email",
                    message: "Es requerido",
                }
            ],
        },
    },
    // 401
    UnauthorizedExample: {
        summary: "No autenticado",
        value: {
            message: "No está autenticado",
        },
    },
    NoAuthTokenExample: {
        summary: "Token no enviado",
        value: {
            message: "No auth token",
        },
    },
    TokenExpiredExample: {
        summary: "Token expirado",
        value: {
            message: "Token expired",
        },
    },
    // 403
    ForbiddenExample: {
        summary: "No permitido",
        value: {
            message: "No tiene permiso para acceder",
        },
    },
    // 404
    ModelNotFoundExample: {
        summary: "Recurso no encontrado",
        value: {
            message: "Recurso no encontrado",
        },
    },
    // 422
    UnprocessableEntityExample: {
        summary: "No se puede procesar la entidad",
        value: {
            message: "Unprocessable entity",
        },
    },
    // 500
    InternalServerErrorExample: {
        summary: "Error Interno del Servidor",
        value: {
            message: "Ocurrió un error interno en el servidor",
        },
    },

}