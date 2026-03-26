import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../../db/models";

@ValidatorConstraint({ async: true })
export class EmailExistsConstraint implements ValidatorConstraintInterface {
    async validate(email: string, args: ValidationArguments) {
        if (!email) 
            return true;
        
        const emailExists = await User.findOne({
            where: { email: email },
        });

        return !emailExists;
    }

    defaultMessage(args: ValidationArguments) {
        return 'El correo electrónico ya esta registrado';
    }
}