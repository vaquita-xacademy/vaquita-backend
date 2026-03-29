import { Project } from "../../../db/models";

export class ProjectResource {
    static toResponse(project: Project) {
        return {
            id: project.id,
            owner_id: project.owner_id,
            category: project.category_data ? project.category_data.name : null,
            title: project.title,
            description: project.description,
            goal_amount: Number(project.goal_amount),
            current_amount: Number(project.current_amount),
            image_url: project.image_url,
            status: project.status,
            slug: project.slug,
            province: project.location_province,
            city: project.location_city,
            created_at: project.created_at,
            updated_at: project.updated_at,
        };
    }

    static toCollection(projects: Project[]) {
        return projects.map(project => ProjectResource.toResponse(project));
    }
}