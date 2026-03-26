import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { createToken } from "../../helpers/token-generator";
import { jwtConfig } from "../../config/jwt.config";
import { setAccessTokenCookie } from "../../helpers/cookies";
import { errorResponse, success } from "../../helpers/responses";
import { CreateUserDto } from "../users/dto/create-user.dto";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService;
    }

    public registerUser = async (request: Request, response: Response) => {
        try {
            const body = request.body as CreateUserDto;
            const user = await this.authService.registerUser(body);
            const jwt = createToken({
                sub: user.id, email: user.email
            }, jwtConfig.access_secret, jwtConfig.access_expire);
            setAccessTokenCookie(response, jwt);

            return success(response, { user: user }, 201);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

}