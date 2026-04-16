import { ProjectUpdate } from "../../../db/models";

export class ProjeUpdateResource {
    static toResponse(project: ProjectUpdate) {
        return {
            id: project.id,
            project_id: project.project_id,
            title: project.title,
            description: project.description,
            receipt_url: project.receipt_url,
            created_at: project.created_at,
            updated_at: project.updated_at,
        };
    }

    static toCollection(projectUpdates: ProjectUpdate[]) {
        return projectUpdates.map(projectUpdate => ProjeUpdateResource.toResponse(projectUpdate));
    }
}