import { IPaymentProvider } from "../interfaces/payment-provider.interface";

export class PaymentsProviderService {
    constructor(
        private readonly provider: IPaymentProvider
    ) { }

    public async createPreference(data: any) {
        return this.provider.createPayment(data);
    }

    public async getPayment(id: string) {
        return this.provider.getPayment(id);
    }
}