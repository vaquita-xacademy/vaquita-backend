export default {
    CreateDonationSuccessExample: {
        summary: "Donación creada exitosamente",
        value: {
            data: {
                donation: {
                    id: 1,
                    project_id: 1,
                    amount: 5000,
                    message: "Mucho éxito con el proyecto, los apoyamos!",
                    created_at: "2026-04-02T00:00:00.000Z",
                },
            },
        },
    },

    ListMineDonationsSuccessExample: {
        summary: "Historial de donaciones del donor",
        value: {
            data: {
                donations: [
                    {
                        id: 1,
                        project: { id: 1, title: "Huerta Comunitaria Sur", slug: "huerta-comunitaria-sur-482" },
                        amount: 5000,
                        message: "Mucho éxito!",
                        created_at: "2026-04-02T00:00:00.000Z",
                    },
                    {
                        id: 2,
                        project: { id: 3, title: "Comedor Barrial Norte", slug: "comedor-barrial-norte-317" },
                        amount: 2000,
                        message: null,
                        created_at: "2026-04-01T00:00:00.000Z",
                    },
                ],
            },
        },
    },

    ListProjectDonationsSuccessExample: {
        summary: "Donaciones de un proyecto (owner/admin)",
        value: {
            data: {
                donations: [
                    {
                        id: 1,
                        donor: { id: 2, name: "Juan" },
                        amount: 5000,
                        message: "Mucho éxito!",
                        created_at: "2026-04-02T00:00:00.000Z",
                    },
                    {
                        id: 3,
                        donor: { id: 7, name: "Ana García" },
                        amount: 1500,
                        message: null,
                        created_at: "2026-04-01T12:00:00.000Z",
                    },
                ],
            },
        },
    },
}
