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
}