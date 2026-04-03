import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { Type } from "class-transformer";

export class UpdateBudgetItemDto {
    @IsOptional()
    @IsNumber({}, { message: errorMessage.numeric })
    id?: number;

    @IsOptional()
    @IsString({message: errorMessage.string})
    name?: string;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    amount?: number;
}