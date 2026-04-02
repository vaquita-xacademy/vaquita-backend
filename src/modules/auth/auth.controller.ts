import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { createToken } from "../../helpers/token-generator";
import { jwtConfig } from "../../config/jwt.config";
import { clearAccessTokenCookie, setAccessTokenCookie } from "../../helpers/cookies";
import { errorResponse, success } from "../../helpers/responses";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserResource } from "../users/resources/user-resource";
import { User } from "../../db/models";

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

            return success(
                response, { user: UserResource.toResponse(user) }, 201
            );
        } catch (error: any) {
            return errorResponse(
                response,
                error.message,
                error.statusCode ?? 500
            );
        }
    };

    public login = (request: Request, response: Response) => {
        try {
            const user = request.user as User;

            const jwt = createToken({
                sub: user.id, email: user.email
            }, jwtConfig.access_secret, jwtConfig.access_expire);

            setAccessTokenCookie(response, jwt);

            return success(
                response, { user: UserResource.toResponse(user) }, 200
            );
        } catch (error: any) {
            return errorResponse(
                response,
                error.message,
                error.statusCode ?? 500
            );
        }
    };

    public session = (request: Request, response: Response) => {
        try {
            const user = request.user as User;
            return success(
                response, { user: UserResource.toResponse(user) }, 200
            );
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public logout = (request: Request, response: Response) => {
        try {
            clearAccessTokenCookie(response);
            return success(
                response, { message: "Logout exitoso" }, 200
            );
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

}