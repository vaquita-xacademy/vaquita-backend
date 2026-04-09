import { env } from "process";

export const mercadoPagoConfig = {
    public_key: env.MERCADO_PAGO_PUBLIC_KEY ?? "",
    access_secret: env.MERCADO_PAGO_ACCESS_TOKEN ?? "",
};