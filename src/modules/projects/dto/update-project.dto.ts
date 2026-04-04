import { IsArray, IsNumber, IsObject, IsOptional, IsString, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { CategoryExists } from "../../../common/validators/category.validator";
import { Type } from "class-transformer";
import { TitleUnique } from "../validators/title.validator";
import { UpdateBudgetItemDto } from "../../budget-items/dto/update-budget-items.dto";

export class UpdateLocationDTO {

    @IsOptional()
    @IsString({ message: errorMessage.string })
    province?: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    city?: string;
}

export class UpdateProjectDTO {

    @IsOptional()
    @IsString({ message: errorMessage.string })
    @MaxLength(100, { message: errorMessage.max_length(100) })
    @TitleUnique()
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
    @Type(() => UpdateLocationDTO)
    location?: UpdateLocationDTO;

    @IsOptional()
    @IsUrl({}, { message: errorMessage.invalid_format })
    image_url?: string;
    
    @IsOptional()
    @IsArray({ message: errorMessage.invalid_format })
    @ValidateNested({ each: true })
    @Type(() => UpdateBudgetItemDto)
    budget_items?: UpdateBudgetItemDto[];
}
