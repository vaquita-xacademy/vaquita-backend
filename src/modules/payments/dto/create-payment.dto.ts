import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { errorMessage } from "../../../helpers/messages";
import { BackUrls } from "mercadopago/dist/clients/preference/commonTypes";
import { Type } from "class-transformer";

export class CreatePaymentDTO {

    @IsNotEmpty({ message: errorMessage.required })
    @IsNumber({}, { message: errorMessage.numeric })
    project_id!: number;

    @IsOptional()
    back_urls?: BackUrls;

    @Type(() => Number)
    @IsNotEmpty({ message: errorMessage.required })
    @IsNumber({}, { message: errorMessage.numeric })
    @Min(1, { message: errorMessage.min_numeric(1) })
    amount!: number;

}
