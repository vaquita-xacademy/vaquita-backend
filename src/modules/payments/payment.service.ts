import { IPaymentProvider } from "./interfaces/payment-provider.interface";

export class PaymentsService {
    constructor(
        private readonly provider: IPaymentProvider
    ) { }

    public async createPayment(data: any) {
        return this.provider.createPayment(data);
    }

    public async getPayment(id: string) {
        return this.provider.getPayment(id);
    }
}