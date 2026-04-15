import { Items } from "mercadopago/dist/clients/commonTypes";
import { BackUrls, Payer } from "mercadopago/dist/clients/preference/commonTypes";

export interface IPaymentProvider {
  createPayment(data: any): Promise<any>;
  getPayment(id: string): Promise<any>;
}

export interface DataCreateMercadoPagoPayment {
  items: Items,
  payer?: Payer | undefined,
  back_urls?: BackUrls | undefined,
  notification_url?: string | undefined,
  externalReference?: string | undefined,
}

export interface PaymentResult {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  amount: number;
  currency: string;
  provider_payment_id: string;
  raw_response?: any;
}