export default {
    "/api/v1/projects/{projectId}/updates": {
        get: {
            tags: ["Project Updates"],
            summary: "Listar todas las actualizaciones de un proyecto",
            parameters: [
                {
                    name: "projectId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                "200": {
                    $ref: "#/components/responses/ListProjectUpdatesSuccessResponse",
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
                },
                "401": {
                    $ref: "#/components/responses/UnauthorizedResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            }
        },
        post: {
            tags: ["Project Updates"],
            summary: "Crear una nueva actualización para un proyecto",
            parameters: [
                {
                    name: "projectId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/CreateProjectUpdateSchema"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    $ref: "#/components/responses/CreatedResponse"
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
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
    "/api/v1/projects/{projectId}/updates/{id}": {
        patch: {
            tags: ["Project Updates"],
            summary: "Actualizar una actualización de un proyecto",
            parameters: [
                {
                    name: "projectId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/UpdateProjectUpdateSchema"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    $ref: "#/components/responses/UpdateProjectUpdateSuccessResponse"
                },
                "400": {
                    $ref: "#/components/responses/BadRequestResponse"
                },
                "401": {
                    $ref: "#/components/responses/UnauthorizedResponse"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerErrorResponse"
                },
            }
        }
    }
}