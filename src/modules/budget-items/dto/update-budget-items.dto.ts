import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { Type } from "class-transformer";

export class UpdateBudgetItemDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    id?: number;

    @IsString({message: errorMessage.string})
    @IsNotEmpty({ message: errorMessage.required })
    name?: string;

    @Type(() => Number)
    @IsInt({ message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    quantity?: number;
}