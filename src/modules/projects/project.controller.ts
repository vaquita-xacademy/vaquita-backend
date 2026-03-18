import { Request, Response } from "express";
import { errorResponse, success } from "../../helpers/responses";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

export class ProjectController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    private getAuthenticatedUserId(request: Request) {
        const user = (request as Request & { user?: any }).user;

        if (!user?.id) {
            const error = new Error("Usuario no autenticado") as Error & { statusCode: number };
            error.statusCode = 401;
            throw error;
        }

        return Number(user.id);
    }

    private getProjectId(request: Request) {
        const projectId = Number(request.params.id);

        if (Number.isNaN(projectId) || projectId <= 0) {
            const error = new Error("El id del proyecto es invalido") as Error & { statusCode: number };
            error.statusCode = 400;
            throw error;
        }

        return projectId;
    }

    public create = async (request: Request, response: Response) => {
        try {
            const body = request.body as CreateProjectDto;
            const userId = this.getAuthenticatedUserId(request);
            const project = await this.projectService.create(body, userId);

            return success(response, { proyecto: project }, 201);
        } catch (error: any) {
            return errorResponse(response, error.message, error.statusCode ?? 500);
        }
    };

    public findAll = async (_request: Request, response: Response) => {
        try {
            const projects = await this.projectService.findAll();
            return success(response, { proyectos: projects });
        } catch (error: any) {
            return errorResponse(response, error.message, error.statusCode ?? 500);
        }
    };

    public findById = async (request: Request, response: Response) => {
        try {
            const projectId = this.getProjectId(request);
            const project = await this.projectService.findById(projectId);

            return success(response, { proyecto: project });
        } catch (error: any) {
            return errorResponse(response, error.message, error.statusCode ?? 500);
        }
    };

    public update = async (request: Request, response: Response) => {
        try {
            const projectId = this.getProjectId(request);
            const userId = this.getAuthenticatedUserId(request);
            const body = request.body as UpdateProjectDto;
            const project = await this.projectService.update(projectId, body, userId);

            return success(response, { proyecto: project });
        } catch (error: any) {
            return errorResponse(response, error.message, error.statusCode ?? 500);
        }
    };
}
