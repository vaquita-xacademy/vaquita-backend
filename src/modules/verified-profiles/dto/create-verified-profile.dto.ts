import { IsEnum, IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { EntityType } from "../../../types/enums";

export class CreateVerifiedProfileDTO {

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    @MaxLength(100, { message: errorMessage.max_length(100) })
    legal_name!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsString({ message: errorMessage.string })
    @MaxLength(100, { message: errorMessage.max_length(100) })
    tax_id!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsUrl({}, { message: errorMessage.invalid_format })
    document_url!: string;

    @IsNotEmpty({ message: errorMessage.required })
    @IsEnum(EntityType, { message: errorMessage.isEnum(Object.values(EntityType)) })
    entity_type!: EntityType;
}
