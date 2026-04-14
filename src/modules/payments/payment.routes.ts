import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { CreatePaymentDTO } from "./dto/create-payment.dto";
import { validateDto } from "../../middlewares/validate-dto.middleware";

const router = Router();

const controller = new PaymentController;

router.post(
    '/create-preference',
    authenticateJwt,
    validateDto(CreatePaymentDTO),
    controller.createPreference
);

// router.post('/receive-pay', async (req: Request, res: Response) => {

//     const topic = (req.query.topic || req.query.type) as string;

//     if (topic != "payment")
//         return res.status(200).send();

//     const paymentProvider = new MercadoPagoProvider();
//     const paymentId = req.query.id as string;

//     const payment = await paymentProvider.getPayment(paymentId);

//     res.json({
//         payment
//     });
// });

export default router;
