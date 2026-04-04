import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { Type } from "class-transformer";

export class IdParamDTO {
    @IsOptional()
    @IsNumber({}, {message: errorMessage.invalid})
    @Type(() => Number)
    id!: number;
}

export class SlugParamDTO {
    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    slug!: string;
}