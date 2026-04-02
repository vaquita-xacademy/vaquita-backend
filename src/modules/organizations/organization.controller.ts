import { Request, Response } from "express";
import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { UserRole } from "../../types/enums";
import { OrganizationService } from "./organization.service";
import { OrganizationResource } from "./resource/organization.resource";
import { CreateOrganizationDTO } from "./dto/create-organization.dto";
import { UpdateOrganizationDTO } from "./dto/update-organization.dto";
import { CreateOrgVerificationDTO } from "./dto/create-org-verification.dto";
import { UpdateOrgVerificationStatusDTO } from "./dto/update-org-verification-status.dto";

export class OrganizationController {
    private service: OrganizationService;

    constructor() {
        this.service = new OrganizationService();
    }

    public create = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const body = request.body as CreateOrganizationDTO;

            const org = await this.service.create(user.id, body);

            return success(response, { organization: OrganizationResource.toResponse(org) }, 201);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public listMine = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const orgs = await this.service.listMine(user.id);

            return success(response, { organizations: orgs.map(OrganizationResource.toResponseWithVerification) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public listAll = async (request: Request, response: Response) => {
        try {
            const orgs = await this.service.listAllWithVerification();

            return success(response, { organizations: orgs.map(OrganizationResource.toResponseWithVerification) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public getById = async (request: Request, response: Response) => {
        try {
            const orgId = parseInt(request.params.id as string, 10);
            const org = await this.service.findById(orgId);

            return success(response, { organization: OrganizationResource.toResponseWithVerification(org) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public update = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const orgId = parseInt(request.params.id as string, 10);
            const body = request.body as UpdateOrganizationDTO;

            const org = await this.service.update(orgId, user.id, body);

            return success(response, { organization: OrganizationResource.toResponse(org) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public createVerification = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const orgId = parseInt(request.params.id as string, 10);
            const body = request.body as CreateOrgVerificationDTO;

            const vp = await this.service.createVerification(orgId, user.id, body);

            return success(response, { verification: vp }, 201);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public getVerification = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const orgId = parseInt(request.params.id as string, 10);
            const isAdmin = user.role === UserRole.ADMIN;

            const vp = await this.service.getVerification(orgId, user.id, isAdmin);

            return success(response, { verification: vp }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public updateVerificationStatus = async (request: Request, response: Response) => {
        try {
            const orgId = parseInt(request.params.id as string, 10);
            const { status } = request.body as UpdateOrgVerificationStatusDTO;

            const vp = await this.service.updateVerificationStatus(orgId, status);

            return success(response, { verification: vp }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };
}
