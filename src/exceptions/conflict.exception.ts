import { HttpException } from "./http.exception";

export class ConflictException extends HttpException {
    constructor(message = 'Conflicto') {
        super(409, message);
    }
}