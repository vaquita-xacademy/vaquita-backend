import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { ProjectStatus, SortOptions } from "../../../types/enums";
import { errorMessage } from "../../../helpers/messages";
import { CategoryExists } from "../../../common/validators/category.validator";
import { PaginateQueryDTO } from "../../../common/dto/paginate-query.dto";
import { Type } from "class-transformer";

export class ListProjectsQueryDTO extends PaginateQueryDTO {

    @IsEnum(SortOptions, { message: errorMessage.isEnum(Object.values(SortOptions)) })
    @IsOptional()
    sort?: SortOptions;

    @CategoryExists({ message: errorMessage.invalid })
    @Min(1, { message: errorMessage.min_numeric(1) })
    @Type(() => Number)
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
    status?: ProjectStatus;

}