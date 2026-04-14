import { env } from "process";
import appConfig from "./app.config";

export const mercadoPagoConfig = {
    public_key: env.MERCADO_PAGO_PUBLIC_KEY ?? "",
    access_secret: env.MERCADO_PAGO_ACCESS_TOKEN ?? "",
    payer_email: env.PAYER_EMAIL_MP ?? "",
    process_payment_url: appConfig.baseUrl + "/api/v1/payments/process-payment",
};