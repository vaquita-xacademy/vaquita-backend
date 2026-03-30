import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Project } from "../../../db/models";
import { ProjectStatus } from "../../../types/enums";

@ValidatorConstraint({ name: "ProjectTitleUnique", async: true })
export class TitleUniqueConstraint implements ValidatorConstraintInterface {
  async validate(title: string, args: ValidationArguments) {
    if (!title)
      return true;

    const projectExists = await Project.findOne({
      where: { title: title, status: ProjectStatus.ACTIVE },
    });

    return !projectExists;
  }

  defaultMessage(args: ValidationArguments) {
    return "Ya tienes un proyecto activo con este nombre, por favor elige otro.";
  }
}

export function TitleUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "TitleUnique",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: TitleUniqueConstraint,
    });
  };
}