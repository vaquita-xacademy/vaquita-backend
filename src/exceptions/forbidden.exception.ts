import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
    constructor(message = 'No permitido') {
        super(403, message);
    }
}