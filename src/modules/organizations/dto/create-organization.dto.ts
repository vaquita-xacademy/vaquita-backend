import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { errorMessage } from "../../../helpers/messages";

export class CreateOrganizationDTO {

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    @MaxLength(100, { message: errorMessage.max_length(100) })
    name!: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    description?: string;

    @IsOptional()
    @IsUrl({}, { message: errorMessage.invalid_format })
    logo_url?: string;
}
