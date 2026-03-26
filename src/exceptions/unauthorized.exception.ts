import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
    constructor(message = 'No autorizado') {
        super(401, message);
    }
}