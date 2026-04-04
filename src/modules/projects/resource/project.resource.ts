import { BudgetItemsResource } from "../../budget-items/resource/budget-items.resource";
import { Project, User } from "../../../db/models";

export class ProjectResource {
    static toResponse(project: Project) {
        return {
            id: project.id,
            owner: project.owner ? { id: project.owner.id, name: project.owner.name } : null,
            category: project.category_data ? project.category_data.name : null,
            title: project.title,
            description: project.description,
            goal_amount: Number(project.goal_amount),
            current_amount: Number(project.current_amount),
            progress: Number(project.progress),
            image_url: project.image_url,
            status: project.status,
            slug: project.slug,
            location: {
                province: project.location.province,
                city: project.location.city,
            },
            budget_items: project.budget_items ? BudgetItemsResource.toCollection(project.budget_items) : [],
            created_at: project.created_at,
            updated_at: project.updated_at,
        };
    }

    static toCard(project: Project) {
        return {
            id: project.id,
            title: project.title,
            image_url: project.image_url,
            status: project.status,
            slug: project.slug,
            location: {
                province: project.location.province,
                city: project.location.city,
            },
            category: project.category_data ? project.category_data.name : null,
            owner: project.owner ? { id: project.owner.id, name: project.owner.name } : null,
            progress: Number(project.progress),
            created_at: project.created_at,
            updated_at: project.updated_at,
        };
    }

    static toCollection(projects: Project[]) {
        return projects.map(project => ProjectResource.toCard(project));
    }
}