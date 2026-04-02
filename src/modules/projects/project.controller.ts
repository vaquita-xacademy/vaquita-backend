import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { UpdateProjectDTO } from "./dto/update-project.dto";
import { UpdateProjectStatusDTO } from "./dto/update-project-status.dto";
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
            const statusCode = error.status ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public listProjects = async (request: Request, response: Response) => {
        try {
            const query = response.locals.query as ListProjectsQueryDTO;
            const result = await this.projectService.listAllPaginate(query);

            return success(response, result, 200);
        } catch (error: any) {
            const statusCode = error.status ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public getBySlug = async (request: Request, response: Response) => {
        try {
            const slug = request.params.slug as string;
            const project = await this.projectService.findBySlug(slug);

            return success(response, { project: ProjectResource.toResponse(project) }, 200);
        } catch (error: any) {
            const statusCode = error.status ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public listMine = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const query = response.locals.query as ListProjectsQueryDTO;
            const result = await this.projectService.listByOwner(user.id, query);

            return success(response, result, 200);
        } catch (error: any) {
            const statusCode = error.status ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public update = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const projectId = parseInt(request.params.id as string, 10);
            const body = request.body as UpdateProjectDTO;

            const project = await this.projectService.update(projectId, user.id, user.role, body);

            return success(response, { project: ProjectResource.toResponse(project) }, 200);
        } catch (error: any) {
            const statusCode = error.status ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public updateStatus = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const projectId = parseInt(request.params.id as string, 10);
            const { status } = request.body as UpdateProjectStatusDTO;

            const project = await this.projectService.updateStatus(projectId, user.id, user.role, status);

            return success(response, { project: { id: project.id, status: project.status } }, 200);
        } catch (error: any) {
            const statusCode = error.status ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };
}
