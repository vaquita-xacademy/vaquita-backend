import { User } from "../../db/models";
import { Request, Response } from "express";
import { errorResponse, success } from "../../helpers/responses";
import { CreateEvidenceDTO, ProjectIdParamDTO } from "./dto/create-evidence.dto";
import { ProjectUpdateService } from "./project-update.service";
import { ProjeUpdateResource } from "./resource/project-update.resource";
import { uploadToCloudinary } from "../../helpers/image-uploader";
import { UpdateEvidenceDTO } from "./dto/update-evidence.dto";


export class ProjectUpdateController {
    private projectUpdateService: ProjectUpdateService;
    
    constructor() {
        this.projectUpdateService = new ProjectUpdateService;
    }

    public create = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const body = request.body as CreateEvidenceDTO;
            const projectId = parseInt(request.params.projectId as string, 10);

            if (request.file) {
                const { url, publicId } = await uploadToCloudinary(request.file.buffer, "projects-updates");
                body.receipt_url = url;
                body.image_public_id = publicId;
            }
            
            const projectUpdate = await this.projectUpdateService.create(projectId, body, user.id, user.role);

            return success(response, { projectUpdate: ProjeUpdateResource.toResponse(projectUpdate) }, 201);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public update = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const body = request.body as UpdateEvidenceDTO;
            const {projectId, id } = request.params;
 
            if (request.file) {
                const { url, publicId } = await uploadToCloudinary(request.file.buffer, "projects-updates");
                body.receipt_url = url;
                body.image_public_id = publicId;
            }
            
            const projectUpdate = await this.projectUpdateService.update(Number(projectId), Number(id), body, user.id, user.role);
            return success(response, { projectUpdate: ProjeUpdateResource.toResponse(projectUpdate) }, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public index = async (request: Request, response: Response) => {
        try {
            const params = response.locals.params as ProjectIdParamDTO;
            const projectId = params.projectId;

            const projectUpdates = await this.projectUpdateService.getByProject(projectId);

            return success(response, { projectUpdates: ProjeUpdateResource.toCollection(projectUpdates) }, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

}