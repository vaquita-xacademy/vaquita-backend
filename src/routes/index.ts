import { Request, Response, Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import swaggerRoutes from "./swagger-ui.route";
import projectRoutes from "../modules/projects/project.routes";
import { MercadoPagoProvider } from "../modules/payments/providers/mercadopago.provider";
import { env } from "process";
import { User } from "../db/models";
import { mercadoPagoConfig } from "../config/mercado_pago.config";

const router = Router();

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);

router.use("/auth", authRoutes)
router.use("/projects", projectRoutes)

router.post('/create-preference', async (req: Request, res: Response) => {
    const paymentProvider = new MercadoPagoProvider();

    try {
        const result = await paymentProvider.createPayment(
            {
                items: { id: "10", title: "Vaquita", unit_price: 5100, quantity: 1 },
                payer: {
                    name: "Gabriel",
                    surname: "Mendez",
                    email: mercadoPagoConfig.payer_email
                },
                externalReference: "PROD-08",
                notification_url: env.BASE_URL + "/api/v1/receive-pay"
            }
        );
        res.json({ init_point: result });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/receive-pay', async (req: Request, res: Response) => {

    const topic = (req.query.topic || req.query.type) as string;

    if (topic != "payment")
        return res.status(200).send();

    const paymentProvider = new MercadoPagoProvider();
    const paymentId = req.query.id as string;

    const payment = await paymentProvider.getPayment(paymentId);

    res.json({
        payment
    });
});


export default router;