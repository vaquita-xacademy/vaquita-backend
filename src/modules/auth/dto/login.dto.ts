import {
    IsEmail,
    IsNotEmpty,
    IsString
} from "class-validator";

// El login solo pide las credenciales minimas para autenticar al usuario.
export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

}
