import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { Type } from "class-transformer";

export class PaginateQueryDTO {

    @Min(1, { message: errorMessage.min_numeric(1) })
    @Type(() => Number)
    @IsNumber({}, { message: errorMessage.numeric })
    @IsNotEmpty({ message: errorMessage.required })
    limit!: string;

    @IsString({ message: errorMessage.string })
    @MinLength(1, { message: errorMessage.minLength(1) })
    @IsOptional()
    after?: string;

    @IsString({ message: errorMessage.string })
    @MinLength(1, { message: errorMessage.minLength(1) })
    @IsOptional()
    before?: string;

}