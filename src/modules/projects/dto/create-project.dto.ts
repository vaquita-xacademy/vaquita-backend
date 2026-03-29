import { IsNotEmpty, IsNumber, IsString, IsUrl, Min, MinLength, Validate } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { CategoryExists} from "../../../common/validators/category.validator";
import { Type } from "class-transformer";

export class CreateProjectDTO {

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    title!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    description!: string;

    @Type(() => Number)
    @IsNotEmpty({ message: errorMessage.required })
    @IsNumber({}, { message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    goal_amount!: number;

    @IsNotEmpty({ message: errorMessage.required })
    @IsNumber({}, { message: errorMessage.numeric })
    @CategoryExists()
    category_id!: number;
    
    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    location_province!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    location_city!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsUrl({}, { message: errorMessage.invalid_format })
    image_url!: string;
}
