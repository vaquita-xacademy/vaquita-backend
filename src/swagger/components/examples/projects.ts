const projectDetail = {
    id: 1,
    owner_id: 3,
    organization_id: null,
    category: "Ecología",
    title: "Huerta Comunitaria Sur",
    description: "Proyecto para crear una huerta comunitaria en el barrio sur de La Plata.",
    goal_amount: 150000,
    current_amount: 0,
    image_url: "https://example.com/imagen.jpg",
    status: "active",
    slug: "huerta-comunitaria-sur-482",
    location: { province: "Buenos Aires", city: "La Plata" },
    created_at: "2026-04-02T00:00:00.000Z",
    updated_at: "2026-04-02T00:00:00.000Z",
};

const projectCard = {
    id: 1,
    title: "Huerta Comunitaria Sur",
    image_url: "https://example.com/imagen.jpg",
    status: "active",
    slug: "huerta-comunitaria-sur-482",
    location: { province: "Buenos Aires", city: "La Plata" },
    category: "Ecología",
    owner: { id: 3, name: "Jimena" },
    created_at: "2026-04-02T00:00:00.000Z",
    updated_at: "2026-04-02T00:00:00.000Z",
};

const paginateInfo = {
    has_next: false,
    has_previous: false,
    next_cursor: null,
    prev_cursor: null,
};

export default {
    CreateProjectSuccessExample: {
        summary: "Proyecto creado exitosamente",
        value: { data: { project: projectDetail } },
    },

    ListPaginateProjectsSuccessExample: {
        summary: "Proyectos listados exitosamente",
        value: {
            data: {
                items: [
                    projectCard,
                    { ...projectCard, id: 2, title: "Comedor Barrial Norte", slug: "comedor-barrial-norte-317", category: "Comunidad" },
                ],
                total_count: 2,
                paginate_info: paginateInfo,
            },
        },
    },

    GetProjectBySlugSuccessExample: {
        summary: "Detalle del proyecto por slug",
        value: { data: { project: projectDetail } },
    },

    ListMineProjectsSuccessExample: {
        summary: "Mis proyectos",
        value: {
            data: {
                items: [projectDetail],
                total_count: 1,
                paginate_info: paginateInfo,
            },
        },
    },

    UpdateProjectSuccessExample: {
        summary: "Proyecto actualizado",
        value: { data: { project: { ...projectDetail, title: "Huerta Comunitaria Sur — Temporada 2026" } } },
    },

    UpdateProjectStatusSuccessExample: {
        summary: "Estado del proyecto actualizado",
        value: { data: { project: { id: 1, status: "paused" } } },
    },
}
