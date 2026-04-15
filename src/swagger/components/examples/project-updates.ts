export default {
    ListProjectUpdatesSuccessExample: {
        summary: "Lista de actualizaciones",
        value: {
            data: [
                {
                    id: 1,
                    project_id: 1,
                    title: "Actualización 1",
                    description: "Descripción 1",
                    receipt_url: "https://example.com/receipt1.jpg",
                    created_at: "2022-01-01T00:00:00.000Z",
                    updated_at: "2022-01-01T00:00:00.000Z"
                },
                {
                    id: 2,
                    project_id: 1,
                    title: "Actualización 2",
                    description: "Descripción 2",
                    receipt_url: "https://example.com/receipt2.jpg",
                    created_at: "2022-01-02T00:00:00.000Z",
                    updated_at: "2022-01-02T00:00:00.000Z"
                }
            ]
        }
    },
    CreateProjectUpdateSuccessExample: {
        summary: "Actualización creada",
        value: {
            data: {
                id: 1,
                project_id: 1,
                title: "Actualización 1",
                description: "Descripción 1",
                receipt_url: "https://example.com/receipt1.jpg",
                created_at: "2022-01-01T00:00:00.000Z",
                updated_at: "2022-01-01T00:00:00.000Z"
            }
        }
    },
    UpdateProjectUpdateSuccessExample: {
        summary: "Actualización actualizada",
        value: {
            data: {
                id: 1,
                project_id: 1,
                title: "Actualización 1",
                description: "Descripción 1",
                receipt_url: "https://example.com/receipt1.jpg",
                created_at: "2022-01-01T00:00:00.000Z",
                updated_at: "2022-01-01T00:00:00.000Z"
            }
        }
    },
}