import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from "class-validator";
import { errorMessage } from "../../../helpers/messages";

export class LoginDto {

    @IsEmail({}, { message: errorMessage.isEmail() })
    @IsNotEmpty({ message: errorMessage.required })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: errorMessage.required })
    password!: string;

}