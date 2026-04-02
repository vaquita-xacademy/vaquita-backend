import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { errorMessage } from "../../../helpers/messages";

export class ProjectParamDTO {
    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    @MinLength(3, { message: errorMessage.minLength(3) })
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: errorMessage.alpha })
    slug!: string;
}