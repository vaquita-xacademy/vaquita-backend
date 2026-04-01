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
                    progress: 0,
                    image_url: "https://example.com/image.jpg",
                    status: "active",
                    slug: "proyecto-1-111",
                    location: {
                        province: "Entre Ríos",
                        city: "Concordia",
                    },
                    budget_items: [
                        {
                            name: "Materiales de construcción",
                            amount: 100,
                        },
                        {
                            name: "Mano de obra",
                            amount: 200,
                        },
                    ],
                    created_at: "2025-12-17T17:00:00Z",
                    updated_at: "2025-12-17T17:00:00Z",
                }
            }
        },
    },
    ListProjectsSuccessExample: {
        summary: "Proyectos listados exitosamente",
        value: {
            data: {
                projects: [
                    {
                        id: 1,
                        owner_id: 1,
                        category: "Comunidad",
                        title: "Huerta Comunitaria",
                        progress: 50,
                        image_url: "https://example.com/image.jpg",
                        status: "active",
                        slug: "huerta-comunitaria-111",
                        location: {
                            province: "Entre Ríos",
                            city: "Concordia",
                        },
                        created_at: "2025-12-17T17:00:00Z",
                        updated_at: "2025-12-17T17:00:00Z",
                    },
                    {
                        id: 2,
                        owner_id: 2,
                        category: "Educación",
                        title: "Apoyo Escolar",
                        progress: 85,
                        image_url: "https://example.com/image2.jpg",
                        status: "active",
                        slug: "apoyo-escolar-222",
                        location: {
                            province: "La Pampa",
                            city: "Santa Rosa",
                        },
                        created_at: "2025-12-17T17:00:00Z",
                        updated_at: "2025-12-17T17:00:00Z",
                    },
                ],
            },
        },
    },
}