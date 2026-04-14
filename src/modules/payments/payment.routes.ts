import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { CreatePaymentDTO } from "./dto/create-payment.dto";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { ProjectService } from "../projects/project.service";
import { BudgetItemsService } from "../budget-items/budget-items.service";

const router = Router();

const budgetItemsService = new BudgetItemsService;
const projectService = new ProjectService(budgetItemsService);
const controller = new PaymentController(projectService);

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
