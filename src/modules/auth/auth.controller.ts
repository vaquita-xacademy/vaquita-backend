import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { createToken } from "../../helpers/token-generator";
import { jwtConfig } from "../../config/jwt.config";
import { clearAccessTokenCookie, setAccessTokenCookie } from "../../helpers/cookies";
import { errorResponse, success } from "../../helpers/responses";
import { CreateDonorDto } from "../donors/dto/create-donor.dto";
import { passportConfig } from "../../config/passport.config";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService;
    }

    private issueAccessSession(response: Response, user: any) {
        const userPayload = this.authService.serializeUser(user);

        // El JWT guarda los datos minimos para rehidratar al usuario despues.
        const jwt = createToken({
            sub: userPayload.id,
            correo_electronico: userPayload.correo_electronico
        }, jwtConfig.access_secret, jwtConfig.access_expire);

        setAccessTokenCookie(response, jwt);

        return userPayload;
    }

    public registerDonor = async (request: Request, response: Response) => {
        try {
            const body = request.body as CreateDonorDto;
            const donor = await this.authService.registerDonor(body);
            const donorPayload = this.issueAccessSession(response, donor);

            return success(response, { donante: donorPayload }, 201);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    };

    public login = async (request: Request, response: Response, next: NextFunction) => {
        // Passport resuelve las credenciales y nos entrega el usuario autenticado.
        passportConfig.authenticate(
            "local",
            { session: false },
            (error: any, user: any, info?: { message?: string }) => {
                if (error) {
                    return next(error);
                }

                if (!user) {
                    return errorResponse(response, info?.message ?? "Credenciales invalidas", 401);
                }

                const usuarioAutenticado = this.issueAccessSession(response, user);
                return success(response, { usuario: usuarioAutenticado });
            }
        )(request, response, next);
    };

    public logout = async (_request: Request, response: Response) => {
        // Logout solo necesita limpiar la cookie firmada del access token.
        clearAccessTokenCookie(response);
        return success(response, { message: "Sesion cerrada correctamente" });
    };

    public me = async (request: Request, response: Response) => {
        const usuario = this.authService.serializeUser((request as Request & { user?: any }).user);
        return success(response, { usuario });
    };
}
