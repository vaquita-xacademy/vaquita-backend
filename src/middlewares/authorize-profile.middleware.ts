import { NextFunction, Request, Response } from "express";
import { User, VerifiedProfile } from "../db/models";
import { errorResponse } from "../helpers/responses";
import { UserRole, VerifiedProfileStatus } from "../types/enums";

export const authorizeProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user as User;
    if (!user) {
        return errorResponse(
            res, "No está autenticado", 401
        );
    }

    if (user.role === UserRole.ADMIN) {
        return next();
    }

    if (user.role === UserRole.OWNER) {
        const verifiedProfile = await VerifiedProfile.findOne({
            where: { user_id: user.id }
        });

        if (!verifiedProfile) {
            return errorResponse(
                res, "Debe completar su perfil de verificación", 403
            );
        }

        if (verifiedProfile.status !== VerifiedProfileStatus.APPROVED) {
            let message = "No tiene un perfil verificado";
            if (verifiedProfile.status === VerifiedProfileStatus.PENDING) {
                message = "Su perfil está en revisión";
            }
            if (verifiedProfile.status === VerifiedProfileStatus.REJECTED) {
                message = "Su perfil fue rechazado";
            }
            return errorResponse(res, message, 403);
        }

        next();
    }

    return errorResponse(res, "No esta autorizado", 403);
};

