import { Response } from "express"

export function success(res: Response, data: any, status: number = 200) {
    res.status(status).json({ data })
}

export function errorResponse(res: Response, message: string, status: number = 400) {
    res.status(status).json({ message })
}

export function validationErrorResponse(res: Response, errors: object | any[]) {
    res.status(400).json({
        message: 'Error en la solicitud',
        errors
    })
}