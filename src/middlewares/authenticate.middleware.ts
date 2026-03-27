import { passportConfig } from "../config/passport.config";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../helpers/responses";

export const authenticateLocal = ((request: Request, response: Response, next: NextFunction) => {
    passportConfig.authenticate("local", (err: any, user: any, info: any) => {
        if (err)
            return next(err);

        if (!user) {
            return errorResponse(
                response, info?.message || "No está autenticado", 401
            );
        }
        request.user = user;
        next();
    })(request, response, next);
});

export const authenticateJwt = ((request: Request, response: Response, next: NextFunction) => {
    passportConfig.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
        if (err)
            return next(err);

        if (!user) {
            return errorResponse(
                response, info?.message || "No está autenticado", 401
            );
        }

        request.user = user;
        next();
    })(request, response, next);
});