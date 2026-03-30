import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Category } from "../../db/models";

@ValidatorConstraint({ name: "CategoryExists", async: true })
export class CategoryExistsConstraint implements ValidatorConstraintInterface {
  async validate(categoryId: number) {

    if(categoryId === undefined || categoryId === null) return true;

    const category = await Category.findByPk(categoryId);
    return !!category;
  }

  defaultMessage(args: ValidationArguments) {
    return "La categoría seleccionada no es válida";
  }
}

export function CategoryExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "CategoryExists",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CategoryExistsConstraint,
    });
  };
}
