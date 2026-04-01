import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";
import { Request, Response } from "express";
import { ProjectResource } from "./resource/project.resource";
import { ProjectDetailResource } from "./resource/project-detail.resource";

export class ProjectController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    public create = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const body = request.body as CreateProjectDTO;
            
            const project = await this.projectService.create(user.id, body);
            
            return success(response, { project: ProjectDetailResource.toResponse(project) }, 201);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };
}