import MercadoPagoConfig, { Payment, Preference, } from "mercadopago";
import { DataCreateMercadoPagoPayment, IPaymentProvider } from "../interfaces/payment-provider.interface";
import { mercadoPagoConfig } from "../../../config/mercado_pago.config";
import { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";

const client = new MercadoPagoConfig({
    accessToken: mercadoPagoConfig.access_secret
});

export class MercadoPagoProvider implements IPaymentProvider {

    public async createPayment(data: DataCreateMercadoPagoPayment) {
        return this.createPreference(data);
    }

    public async getPayment(id: string): Promise<any> {
        const paymentHandler = new Payment(client);
        const payment = await paymentHandler.get({ id: id });
        return payment;
    }

    private async createPreference(data: DataCreateMercadoPagoPayment) {

        const preference: Preference = new Preference(client);
        const body: PreferenceRequest = {
            items: [data.items],
            payer: data.payer,
            back_urls: data.back_urls,
            notification_url: data.notification_url,
            external_reference: data.externalReference
        };

        return await preference.create({ body });
    }
}
