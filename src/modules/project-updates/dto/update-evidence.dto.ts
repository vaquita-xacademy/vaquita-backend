import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength} from "class-validator";
import { errorMessage } from "../../../helpers/messages";

export class UpdateEvidenceDTO {
    @IsOptional()
    @IsString({ message: errorMessage.string })
    title?: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    description?: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    receipt_url?: string;

    @IsOptional()
    @IsString({ message: errorMessage.string })
    image_public_id?: string;
}