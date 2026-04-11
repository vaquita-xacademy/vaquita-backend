import { Request, Response } from "express";
import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { VerifiedProfileService } from "./verified-profile.service";
import { VerifiedProfileResource } from "./resource/verified-profile.resource";
import { CreateVerifiedProfileDTO } from "./dto/create-verified-profile.dto";
import { UpdateVerifiedProfileStatusDTO } from "./dto/update-verified-profile-status.dto";

export class VerifiedProfileController {
    private service: VerifiedProfileService;

    constructor() {
        this.service = new VerifiedProfileService();
    }

    public create = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const body = request.body as CreateVerifiedProfileDTO;

            const profile = await this.service.create(user.id, body);

            return success(response, { verified_profile: VerifiedProfileResource.toResponse(profile) }, 201);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public getMine = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;

            const profile = await this.service.findMine(user.id);

            return success(response, { verified_profile: VerifiedProfileResource.toResponse(profile) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public listAll = async (request: Request, response: Response) => {
        try {
            const profiles = await this.service.listAll();

            return success(response, { verified_profiles: profiles.map(VerifiedProfileResource.toResponse) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public updateStatus = async (request: Request, response: Response) => {
        try {
            const profileId = parseInt(request.params.id as string, 10);
            const { status } = request.body as UpdateVerifiedProfileStatusDTO;

            const profile = await this.service.updateStatus(profileId, status);

            return success(response, { verified_profile: VerifiedProfileResource.toResponse(profile) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };
}
