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
    ListPaginateProjectsSuccessExample: {
        summary: "Proyectos listados exitosamente",
        value: {
            data: {
                items: [
                    {
                        id: 5,
                        title: "Otro proyecto 6",
                        image_url: "https://example.com/image.jpg",
                        status: "active",
                        slug: "otro-proyecto-6-525",
                        location: {
                            city: "Capital",
                            province: "Cordoba"
                        },
                        created_at: "2026-03-31T22:07:09.019Z",
                        updated_at: "2026-03-31T22:07:09.019Z",
                        category_data: {
                            id: 4,
                            name: "Animales"
                        },
                        owner: {
                            id: 2,
                            name: "Nahuel"
                        }
                    },
                    {
                        id: 4,
                        title: "Otro proyecto 5",
                        image_url: "https://example.com/image.jpg",
                        status: "active",
                        slug: "otro-proyecto-5-481",
                        location: {
                            city: "Capital",
                            province: "Cordoba"
                        },
                        created_at: "2026-03-31T22:07:00.439Z",
                        updated_at: "2026-03-31T22:07:00.439Z",
                        category_data: {
                            id: 1,
                            name: "Ecología"
                        },
                        owner: {
                            id: 2,
                            name: "Nahuel"
                        }
                    }
                ],
                total_count: 5,
                paginate_info: {
                    has_next: true,
                    has_previous: false,
                    next_cursor: "WyIyMDI2LTAzLTMxVDIyOjA3OjAwLjQzOVoiLDRd",
                    prev_cursor: null
                }
            }
        },
    },
}