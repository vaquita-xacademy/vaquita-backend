import { errorResponse, success } from "../../helpers/responses";
import { Request, Response } from "express";
import { mercadoPagoConfig } from "../../config/mercado_pago.config";
import { User } from "../../db/models";
import crypto from "crypto";
import { ProjectService } from "../projects/project.service";
import { PaymentsService } from "./payment.service";
import { CreatePaymentDTO } from "./dto/create-payment.dto";
import { PaymentsProviderService } from "./providers/payment-provider.service";
import { DonationService } from "../donations/donation.service";

export class PaymentController {
    private paymentService: PaymentsService;
    private donationService: DonationService;

    constructor(
        private paymentProvService: PaymentsProviderService,
        private projectService: ProjectService
    ) {
        this.paymentService = new PaymentsService;
        this.donationService = new DonationService;
    }

    public createPreference = async (request: Request, response: Response) => {
        const notificationUrl = mercadoPagoConfig.process_payment_url;
        const user = request.user as User;

        try {
            const data = request.body as CreatePaymentDTO;

            const referenceId = crypto.randomBytes(32).toString("hex");
            const project = await this.projectService.findById(data.project_id);

            const preference = await this.paymentProvService.createPreference(
                {
                    items: {
                        id: String(project.id),
                        title: project.title,
                        quantity: 1,
                        unit_price: data.amount
                    },
                    payer: {
                        name: user?.name,
                        email: mercadoPagoConfig.payer_email
                    },
                    back_urls: data.back_urls,
                    externalReference: `VAQ-MP-${referenceId}`,
                    notification_url: notificationUrl
                }
            );

            const payment = await this.paymentService.createPayment(data, preference.external_reference);

            success(response, {
                preference: {
                    external_reference: preference.external_reference,
                    init_point: preference.init_point,
                },
                payment: payment
            }, 201);
        } catch (error: any) {
            errorResponse(
                response,
                error.message,
                error.status ?? 500
            );
        }
    }

    public processPayment = async (request: Request, response: Response) => {

        try {
            const topic = (request.query.topic || request.query.type) as string;

            if (topic != "payment")
                return response.status(200).send();

            const paymentId = request.body?.data?.id || request.query?.id;
            const payment = await this.paymentProvService.getPayment(paymentId);

            if (payment.status == "pending") {

            }

            const paymentUpdated = await this.paymentService.update({
                status: payment.status,
                provider_payment_id: payment.id,
                external_reference: payment.external_reference
            });

            // this.projectService.update();

            success(response, {
                paymentUpdated
            }, 200);
        } catch (error: any) {
            errorResponse(
                response,
                error.message,
                error.status ?? 500
            );
        }
    }
}
