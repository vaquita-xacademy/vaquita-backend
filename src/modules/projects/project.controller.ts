import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";
import { Request, Response } from "express";
import { ProjectResource } from "./resource/project.resource";
import { ProjectStatus, SortOptions } from "../../types/enums";

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
            const limit = parseInt(request.query.limit as string);
            const after = request.query.after as string | undefined;
            const before = request.query.before as string | undefined;
            const sort = request.query.sort as SortOptions;
            const category_id = parseInt(request.query.category_id as string);
            const search = request.query.search as string | undefined;
            const status = request.query.status as string as ProjectStatus;

            const projectsPaginate = await this.projectService.listAllPaginate({
                limit: limit, after: after, before: before,
                sort: sort, category_id: category_id, search: search, status: status
            });

            return success(response, projectsPaginate, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };
}