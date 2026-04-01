import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { ProjectStatus, SortOptions } from "../../../types/enums";
import { errorMessage } from "../../../helpers/messages";
import { CategoryExists } from "../../../common/validators/category.validator";
import { PaginateQueryDTO } from "../../../common/dto/paginate-query.dto";

export class ListProjectsQueryDTO extends PaginateQueryDTO {

    @IsEnum(SortOptions, { message: errorMessage.isEnum(Object.values(SortOptions)) })
    @IsOptional()
    sort?: SortOptions;

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
    status?: ProjectStatus;

}