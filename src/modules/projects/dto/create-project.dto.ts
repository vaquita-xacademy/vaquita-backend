import { IsNotEmpty, IsNumber, IsObject, IsString, IsUrl, Min, ValidateNested } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { CategoryExists} from "../../../common/validators/category.validator";
import { Type } from "class-transformer";

export class LocationDTO {
    
    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    province!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    city!: string;
}
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
    
    @IsObject({ message: errorMessage.invalid_format})
    @ValidateNested()
    @Type(() => LocationDTO)
    location!: LocationDTO;

    @IsNotEmpty({ message: errorMessage.required })
    @IsUrl({}, { message: errorMessage.invalid_format })
    image_url!: string;
}
