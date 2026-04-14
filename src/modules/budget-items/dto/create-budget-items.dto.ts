import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { Type } from "class-transformer";

export class CreateBudgetItemDto {
    @IsNotEmpty({message: errorMessage.required})
    @IsString({message: errorMessage.string})
    name!: string;

    @Type(() => Number)
    @IsNotEmpty({ message: errorMessage.required })
    @IsInt({ message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    quantity!: number;
}