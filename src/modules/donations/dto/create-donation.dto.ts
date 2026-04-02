import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { errorMessage } from "../../../helpers/messages";

export class CreateDonationDTO {

    @IsNotEmpty({ message: errorMessage.required })
    @IsNumber({}, { message: errorMessage.numeric })
    project_id!: number;

    @Type(() => Number)
    @IsNotEmpty({ message: errorMessage.required })
    @IsNumber({}, { message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    amount!: number;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    message?: string;
}
