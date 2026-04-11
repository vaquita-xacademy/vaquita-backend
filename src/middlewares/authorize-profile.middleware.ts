import { NextFunction, Request, Response } from "express";
import { Organization, OrganizationVerifiedProfile, User, VerifiedProfile } from "../db/models";
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
        // Verificar perfil del usuario
        const verifiedProfile = await VerifiedProfile.findOne({
            where: { user_id: user.id },
        });

        if (!verifiedProfile) {
            return errorResponse(res, "Debe completar su perfil de verificación", 403);
        }

        if (verifiedProfile.status !== VerifiedProfileStatus.APPROVED) {
            if (verifiedProfile.status === VerifiedProfileStatus.PENDING) {
                return errorResponse(res, "Su perfil está en revisión", 403);
            }
            return errorResponse(res, "Su perfil fue rechazado", 403);
        }

        // Si se provee organization_id, verificar también la organización
        const organizationId = req.body?.organization_id;
        if (organizationId) {
            const org = await Organization.findByPk(organizationId);

            if (!org) {
                return errorResponse(res, "Organización no encontrada", 404);
            }

            if (org.owner_id !== user.id) {
                return errorResponse(res, "No tienes permiso para crear proyectos bajo esta organización", 403);
            }

            const orgVerifiedProfile = await OrganizationVerifiedProfile.findOne({
                where: { organization_id: organizationId },
            });

            if (!orgVerifiedProfile) {
                return errorResponse(res, "La organización debe completar su perfil de verificación", 403);
            }

            if (orgVerifiedProfile.status !== VerifiedProfileStatus.APPROVED) {
                if (orgVerifiedProfile.status === VerifiedProfileStatus.PENDING) {
                    return errorResponse(res, "La verificación de la organización está en revisión", 403);
                }
                return errorResponse(res, "La verificación de la organización fue rechazada", 403);
            }
        }

        return next();
    }

    return errorResponse(res, "No está autorizado", 403);
};
