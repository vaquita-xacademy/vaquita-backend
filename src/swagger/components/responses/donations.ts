export default {
    CreateDonationSuccessResponse: {
        description: "Donación realizada exitosamente",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/CreateDonationSuccessExample" } },
            },
        },
    },

    ListMineDonationsSuccessResponse: {
        description: "Historial de donaciones del donor",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/ListMineDonationsSuccessExample" } },
            },
        },
    },

    ListProjectDonationsSuccessResponse: {
        description: "Donaciones del proyecto",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SuccessSchema" },
                examples: { success: { $ref: "#/components/examples/ListProjectDonationsSuccessExample" } },
            },
        },
    },
}
