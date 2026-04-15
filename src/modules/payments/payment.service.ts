import { Payment } from "../../db/models";
import { CreatePaymentDTO } from "./dto/create-payment.dto";

export class PaymentsService {
    constructor(
    ) { }

    public async createPayment(data: CreatePaymentDTO, externalReference: string) {
        return await Payment.create({
            project_id: data.project_id,
            amount: data.amount,
            external_reference: externalReference,
        });
    }

    public async update(data: any) {
        if (!await Payment.update(data, {
            where: { external_reference: data.external_reference }
        })) {

        }

        return await Payment.findOne({
            where: { external_reference: data.external_reference }
        });
    }
}