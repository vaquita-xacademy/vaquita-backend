import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { createToken } from "../../helpers/token-generator";
import { jwtConfig } from "../../config/jwt.config";
import { setAccessTokenCookie } from "../../helpers/cookies";
import { errorResponse, success } from "../../helpers/responses";
import { CreateDonorDto } from "../donors/dto/create-donor.dto";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService;
    }

    public registerDonor = async (request: Request, response: Response) => {
        try {
            const body = request.body as CreateDonorDto;
            // const donor = await this.authService.registerDonor(body);
            const donor: any = {};
            const jwt = createToken({
                sub: donor.id, email: donor.email
            }, jwtConfig.access_secret, jwtConfig.access_expire);

            setAccessTokenCookie(response, jwt);

            return success(response, { data: { donor } }, 201);
        } catch (error: any) {
            return errorResponse(response, error.message, 500);
        }
    };
}