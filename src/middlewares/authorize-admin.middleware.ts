import { NextFunction, Request, Response } from "express";
import { User } from "../db/models";
import { errorResponse } from "../helpers/responses";
import { UserRole } from "../types/enums";

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (user?.role !== UserRole.ADMIN) {
        return errorResponse(res, "No tiene permisos para realizar esta acción", 403);
    }

    return next();
};
