export default {
    CreateProjectSuccessExample: {
        summary: "Proyecto creado exitosamente",
        value: {
            data: {
                project: {
                    id: 1,
                    owner_id: 1,
                    category: "Categoria 1",
                    title: "Proyecto 1",
                    description: "Descripción del proyecto 1",
                    goal_amount: 1000,
                    current_amount: 0,
                    image_url: "https://example.com/image.jpg",
                    status: "active",
                    slug: "proyecto-1-111",
                    location: {
                        province: "Entre Ríos",
                        city: "Concordia",
                    },
                    created_at: "2025-12-17T17:00:00Z",
                    updated_at: "2025-12-17T17:00:00Z",
                }
            }
        },
    },
}