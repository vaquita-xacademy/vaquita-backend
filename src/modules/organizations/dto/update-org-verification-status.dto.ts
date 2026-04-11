import { IsEnum, IsNotEmpty } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { VerifiedProfileStatus } from "../../../types/enums";

export class UpdateOrgVerificationStatusDTO {

    @IsNotEmpty({ message: errorMessage.required })
    @IsEnum(VerifiedProfileStatus, { message: errorMessage.isEnum(Object.values(VerifiedProfileStatus)) })
    status!: VerifiedProfileStatus;
}
