import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { validationErrorResponse } from "../helpers/responses";

export function validateDto(dto: any) {
    async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(dto, req.body);
        const errors = await validate(instance);

        if (errors.length > 0)
            return validationErrorResponse(res, errors);

        req.body = instance;
        next();
    };
}