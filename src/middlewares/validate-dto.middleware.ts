import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { validationErrorResponse } from "../helpers/responses";
import { ValidationError } from "class-validator";

export const validateDto = (dto: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(dto, req.body);
        const errors = await validate(instance);

        if (errors.length > 0)
            return validationErrorResponse(res, formatErrors(errors));

        req.body = instance;
        next();
    };

function formatErrors(errors: ValidationError[]) {
    return errors.map(
        error => ({
            field: error.property,
            message: Object.values(error.constraints || {})[0],
        })
    )
}

export const validateQuery = (dto: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(dto, req.query ?? {}) as any;
        const errors = await validate(instance);

        if (errors.length > 0)
            return validationErrorResponse(res, formatErrors(errors));
        
        res.locals.query = instance;
        next();
    };

export const validateParams = (dto: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(dto, req.params, {
            enableImplicitConversion: true
        }) as object;

        const errors = await validate(instance);

        if (errors.length > 0)
            return validationErrorResponse(res, formatErrors(errors));
        res.locals.params = instance;
        next();
    };
