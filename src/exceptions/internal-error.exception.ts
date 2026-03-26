import { HttpException } from "./http.exception";

export class InternalServerErrorException extends HttpException {
    constructor(message = 'Ocurrió un error en el servidor') {
        super(500, message);
    }
}