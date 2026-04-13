import { Request, Response } from "express";
import { User } from "../../db/models";
import { errorResponse, success } from "../../helpers/responses";
import { DonationService } from "./donation.service";
import { DonationResource } from "./resource/donation.resource";
import { CreateDonationDTO } from "./dto/create-donation.dto";

export class DonationController {
    private service: DonationService;

    constructor() {
        this.service = new DonationService();
    }

    public create = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const body = request.body as CreateDonationDTO;

            const donation = await this.service.create(user.id, body);

            return success(response, { donation: { id: donation.id, project_id: donation.project_id, amount: Number(donation.amount), message: donation.message ?? null, created_at: donation.created_at } }, 201);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public listMine = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const donations = await this.service.listMine(user.id);

            return success(response, { donations: donations.map(DonationResource.toMine) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };

    public listByProject = async (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            const projectId = parseInt(request.params.id as string, 10);

            const donations = await this.service.listByProject(projectId, user.id, user.role);

            return success(response, { donations: donations.map(DonationResource.toProjectView) }, 200);
        } catch (error: any) {
            return errorResponse(response, error.message, error.status ?? 500);
        }
    };
}
