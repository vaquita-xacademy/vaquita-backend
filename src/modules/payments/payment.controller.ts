import { errorResponse, success } from "../../helpers/responses";
import { Request, Response } from "express";
import { MercadoPagoProvider } from "./providers/mercadopago.provider";
import { mercadoPagoConfig } from "../../config/mercado_pago.config";
import { User } from "../../db/models";
import crypto from "crypto";
import { ProjectService } from "../projects/project.service";

export class PaymentController {

    constructor(
        private projectService: ProjectService
    ) { }

    public createPreference = async (request: Request, response: Response) => {
        const paymentProvider = new MercadoPagoProvider;
        const notificationUrl = mercadoPagoConfig.process_payment_url;

        const user = request.user as User;

        try {
            const { project_id, back_urls, amount } = request.body;

            const referenceId = crypto.randomBytes(32).toString("hex");
            const project = await this.projectService.findById(parseInt(project_id));

            const result = await paymentProvider.createPayment(
                {
                    items: {
                        id: String(project.id),
                        title: project.title,
                        quantity: 1,
                        unit_price: amount
                    },
                    payer: {
                        name: user?.name,
                        email: mercadoPagoConfig.payer_email
                    },
                    back_urls: back_urls,
                    externalReference: `VAQ-MP-${referenceId}`,
                    notification_url: notificationUrl
                }
            );

            success(response, {
                external_reference: result.external_reference,
                init_point: result.init_point,
                preference: result,
            }, 201);
        } catch (error: any) {
            errorResponse(
                response,
                error.message,
                error.status ?? 500
            );
        }
    }

}
