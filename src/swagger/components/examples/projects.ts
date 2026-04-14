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
                            quantity: 100
                        },
                        {
                            name: "Mano de obra",
                            quantity: 20,
                        },
                    ],
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
    ListMineProjectsSuccessExample: {
        summary: "Mis proyectos obtenidos exitosamente",
        value: {
            data: {
                projects: [
                    {
                        id: 1,
                        owner_id: { id: 3, name: "Jimena" },
                        category: "Ecología",
                        title: "Huerta Comunitaria Sur",
                        progress: 50,
                        image_url: "https://example.com/image.jpg",
                        status: "active",
                        slug: "huerta-comunitaria-sur-482",
                        location: {
                            province: "Buenos Aires",
                            city: "La Plata",
                        },
                        created_at: "2025-12-17T17:00:00Z",
                        updated_at: "2025-12-17T17:00:00Z",
                    },
                    {
                        id: 2,
                        owner_id: { id: 3, name: "Jimena" },
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
                total_count: 2,
                paginate_info: {
                    has_next: false,
                    has_previous: false,
                    next_cursor: null,
                    prev_cursor: null,
                },
            },
        },
    },
    ProjectBySlugSuccessExample: {
        summary: "Proyecto obtenido exitosamente",
        value: {
            data: {
                project: {
                    id: 1,
                    owner_id: 1,
                    category: "Comunidad",
                    title: "Huerta Comunitaria",
                    description: "Proyecto para crear una huerta comunitaria para abastecer de alimentos frescos a los vecinos de la zona.",
                    goal_amount: 1000,
                    current_amount: 0,
                    progress: 0,
                    image_url: "https://example.com/image.jpg",
                    status: "active",
                    slug: "huerta-comunitaria-111",
                    location: {
                        province: "Entre Ríos",
                        city: "Concordia",
                    },
                    budget_items: [
                        {
                            name: "Semillas de estación",
                            quantity: 50,
                        },
                        {
                            name: "Macetas",
                            quantity: 10,
                        },
                        {
                            name: "Palas",
                            quantity: 2,
                        },
                        {
                            name: "Tierra fertil x bolsa",
                            quantity: 30,
                        },
                    ],
                    created_at: "2025-12-17T17:00:00Z",
                    updated_at: "2025-12-17T17:00:00Z",
                }
            }
        },
    },
    UpdateProjectSuccessExample: {
        summary: "Proyecto actualizado exitosamente",
        value: {
            data: {
                project: {
                    id: 1,
                    owner_id: 1,
                    category: "Comunidad",
                    title: "Huerta Comunitaria",
                    description: "Proyecto para crear una huerta comunitaria para abastecer de alimentos frescos a los vecinos de la zona.",
                    goal_amount: 1000,
                    current_amount: 0,
                    progress: 0,
                    image_url: "https://example.com/image.jpg",
                    status: "active",
                    slug: "huerta-comunitaria-111",
                    location: {
                        province: "Entre Ríos",
                        city: "Concordia",
                    },
                    budget_items: [
                        {
                            id: 1,
                            name: "Semillas de lechuga",
                            quantity: 30,
                        },
                    ],
                    created_at: "2025-12-17T17:00:00Z",
                    updated_at: "2025-12-17T17:00:00Z",
                }
            }
        },
    },
    UpdateProjectStatusSuccessExample: {
        summary: "Estado del proyecto actualizado exitosamente",
        value: {
            data: {
                project: {
                    id: 1,
                    status: "paused",
                }
            }
        },
    },
    DeleteProjectSuccessExample: {
        summary: "Proyecto eliminado exitosamente",
        value: {
            data: {
                message: "Proyecto eliminado exitosamente",
            },
        },
    },
    ListFeaturedProjectsSuccessExample: {
        summary: "Proyectos destacados obtenidos exitosamente",
        value: {
            data: {
                projects: [
                    {
                        id: 1,
                        owner_id: { id: 3, name: "Jimena" },
                        category: "Ecología",
                        title: "Huerta Comunitaria Sur",
                        progress: 50,
                        image_url: "https://example.com/image.jpg",
                        status: "active",
                        slug: "huerta-comunitaria-sur-482",
                        location: {
                            province: "Buenos Aires",
                            city: "La Plata",
                        },
                        created_at: "2025-12-17T17:00:00Z",
                        updated_at: "2025-12-17T17:00:00Z",
                    },
                    {
                        id: 2,
                        owner_id: { id: 3, name: "Jimena" },
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