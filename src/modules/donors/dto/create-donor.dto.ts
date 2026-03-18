import {
    IsEmail,
    IsISO8601,
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from "class-validator";

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

    @IsStrongPassword()
    @IsNotEmpty()
    password_confirmation!: string;

    @IsString()
    @IsNotEmpty()
    dni!: string;

    @IsISO8601()
    @IsNotEmpty()
    birth_date!: Date;

}