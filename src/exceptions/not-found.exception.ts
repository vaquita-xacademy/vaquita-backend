import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
    constructor(message = 'Recurso no encontrado') {
        super(404, message);
    }
}