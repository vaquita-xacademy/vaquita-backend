import {
    IsEmail,
    IsISO8601,
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from "class-validator";

// Mantenemos este contrato HTTP y luego lo traducimos al modelo en espanol.
export class CreateDonorDto {

    @IsString()
    @IsNotEmpty()
    full_name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password!: string;

    // Esta confirmacion se compara en el service antes de guardar.
    @IsStrongPassword()
    @IsNotEmpty()
    password_confirmation!: string;

    @IsString()
    @IsNotEmpty()
    dni!: string;

    @IsISO8601()
    @IsNotEmpty()
    birth_date!: string;

}
