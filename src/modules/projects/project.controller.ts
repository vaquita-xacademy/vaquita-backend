import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { UpdateProjectDTO } from "./dto/update-project.dto";
import { UpdateProjectStatusDTO } from "./dto/update-project-status.dto";
import { ProjectService } from "./project.service";
import { Request, Response } from "express";
import { ProjectResource } from "./resource/project.resource";
import { ListProjectsQueryDTO } from "./dto/list-projects-query.dto";
import { IdParamDTO, SlugParamDTO} from "./dto/project-param.dto";
import { BudgetItemsService } from "../budget-items/budget-items.service";

export class ProjectController {
    private projectService: ProjectService;

    constructor() {
        const budgetItemsService = new BudgetItemsService();
        this.projectService = new ProjectService(budgetItemsService);
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
            const params = response.locals.params as SlugParamDTO;
            const slug = params.slug;
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
            const { id } = response.locals.params as IdParamDTO;
            const body = request.body as UpdateProjectDTO;

            const project = await this.projectService.update(id, user.id, user.role, body);

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

    public delete = async (request: Request, response: Response) => {
        try {
            const { id } = response.locals.params as IdParamDTO;
            const user = request.user as User;

            await this.projectService.delete(id, user.id, user.role);

            return success(response, { message: "Proyecto eliminado exitosamente" }, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public listFeatured = async (request: Request, response: Response) => {
        try {
            const projects = await this.projectService.listFeatured();
            return success(response, { projects }, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public findById = async (request: Request, response: Response) => {
        try {
            const { id } = response.locals.params as IdParamDTO;
            const project = await this.projectService.findById(id);

            return success(response, { project: ProjectResource.toResponse(project) }, 200);
        } catch (error: any) {
            const statusCode = error.status ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };
}
