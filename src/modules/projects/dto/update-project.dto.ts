import { IsNumber, IsObject, IsOptional, IsString, IsUrl, Min, ValidateNested } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { CategoryExists } from "../../../common/validators/category.validator";
import { Type } from "class-transformer";
import { LocationDTO } from "./create-project.dto";

export class UpdateProjectDTO {

    @IsOptional()
    @IsString({ message: errorMessage.string })
    title?: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    description?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    goal_amount?: number;

    @IsOptional()
    @IsNumber({}, { message: errorMessage.numeric })
    @CategoryExists()
    category_id?: number;

    @IsOptional()
    @IsObject({ message: errorMessage.invalid_format })
    @ValidateNested()
    @Type(() => LocationDTO)
    location?: LocationDTO;

    @IsOptional()
    @IsUrl({}, { message: errorMessage.invalid_format })
    image_url?: string;
}
