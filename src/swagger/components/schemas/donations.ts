export default {
    CreateDonationRequestSchema: {
        type: "object",
        properties: {
            project_id: {
                type: "integer",
                description: "ID del proyecto a donar",
                example: 1,
            },
            amount: {
                type: "number",
                minimum: 1,
                description: "Monto a donar (mínimo 1)",
                example: 5000,
            },
            message: {
                type: "string",
                nullable: true,
                description: "Mensaje opcional para el proyecto",
                example: "Mucho éxito con el proyecto, los apoyamos!",
            },
        },
        required: ["project_id", "amount"],
    },
}
