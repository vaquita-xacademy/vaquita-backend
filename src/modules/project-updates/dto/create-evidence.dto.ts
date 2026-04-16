import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength} from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { Type } from "class-transformer";

export class CreateEvidenceDTO {

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    title!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    description!: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    receipt_url?: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    image_public_id?: string;
}

export class ProjectIdParamDTO {
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty({ message: errorMessage.required })
    projectId!: number; 
}