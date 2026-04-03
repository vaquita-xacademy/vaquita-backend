import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";
import { Request, Response } from "express";
import { ProjectResource } from "./resource/project.resource";
import { ListProjectsQueryDTO } from "./dto/list-projects-query.dto";
import { IdParamDTO, SlugParamDTO} from "./dto/project-param.dto";
import { UpdateProjectDTO } from "./dto/update-project.dto";
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

    public findBySlug = async (request: Request, response: Response) => {
        try {
            const params = response.locals.params as SlugParamDTO;
            const slug = params.slug;
            const project = await this.projectService.findBySlug(slug);

            return success(response, { project: ProjectResource.toResponse(project) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.statusCode ?? 500);
        }
    };

    public update = async (request: Request, response: Response) => {
        try {

            const { id } = response.locals.params as IdParamDTO;
            const user = request.user as User; 
            request.body.id = id; 

            const body = request.body as UpdateProjectDTO;
            
            const project = await this.projectService.update(id, user.id, user.role, body);
            
            return success(response, { project: ProjectResource.toResponse(project) }, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
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
}