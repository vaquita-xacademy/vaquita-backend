import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";
import { Request, Response } from "express";
import { ProjectResource } from "./resource/project.resource";
import { ListProjectsQueryDTO } from "./dto/list-projects-query.dto";

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

            return success(response, { project: ProjectResource.toResponse(project) }, 201);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public listProjects = async (request: Request, response: Response) => {
        try {
            const query = response.locals.query as ListProjectsQueryDTO;
            const projectsPaginate = await this.projectService.listAllPaginate(query);

            return success(response, projectsPaginate, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };
}