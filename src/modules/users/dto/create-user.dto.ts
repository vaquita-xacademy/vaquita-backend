import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Validate,
} from "class-validator";
import { UserRole } from "../../../types/enums";
import { Match } from "../../../common/validators/match-validator";
import { EmailExistsConstraint } from "../../../common/validators/email.validator";
import { errorMessage } from "../../../helpers/messages";

export class CreateUserDto {

    @IsString({ message: errorMessage.string })
    @IsNotEmpty({ message: errorMessage.required })
    name!: string;

    @Validate(EmailExistsConstraint)
    @IsEmail({}, { message: errorMessage.isEmail() })
    @IsNotEmpty({ message: errorMessage.required })
    email!: string;

    @IsStrongPassword({}, { message: errorMessage.weak_password })
    @IsNotEmpty({ message: errorMessage.required })
    password!: string;

    @Match("password")
    @IsStrongPassword({}, { message: errorMessage.weak_password })
    @IsNotEmpty({ message: errorMessage.required })
    password_confirmation!: string;

    @IsEnum(UserRole, { message: errorMessage.isEnum(Object.values(UserRole)) })
    @IsNotEmpty({ message: errorMessage.required })
    role!: UserRole;

}