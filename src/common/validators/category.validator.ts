import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Category } from "../../db/models";
import { errorMessage } from "../../helpers/messages";

@ValidatorConstraint({ name: "CategoryExists", async: true })
export class CategoryExistsConstraint implements ValidatorConstraintInterface {
  async validate(categoryId: number) {

    if(categoryId === undefined || categoryId === null) return true;

    const category = await Category.findByPk(categoryId);
    return !!category;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} ${errorMessage.invalid}`;
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
