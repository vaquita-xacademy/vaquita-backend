import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { errorMessage } from "../../../helpers/messages";

export class CreateCategoryDTO {
    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    name!: string;

    @IsString({ message: errorMessage.string })
    @IsOptional()
    icon_name?: string;
}