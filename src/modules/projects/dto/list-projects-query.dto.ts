import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { ProjectStatus, SortOptions } from "../../../types/enums";
import { errorMessage } from "../../../helpers/messages";
import { CategoryExists } from "../../../common/validators/category.validator";

export class ListProjectsQueryDTO {

    @IsEnum(SortOptions, { message: errorMessage.isEnum(Object.values(SortOptions)) })
    @IsOptional()
    sort?: string;

    @CategoryExists({ message: errorMessage.invalid })
    @IsNumber({}, { message: errorMessage.numeric })
    @IsOptional()
    category_id?: number;

    @IsString({ message: errorMessage.string })
    @MinLength(1, { message: errorMessage.minLength(1) })
    @IsOptional()
    search?: string;

    @IsEnum(ProjectStatus, { message: errorMessage.isEnum(Object.values(ProjectStatus)) })
    @IsNotEmpty({ message: errorMessage.required })
    @IsOptional()
    status?: string;

}