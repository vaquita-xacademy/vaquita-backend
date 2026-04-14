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

router.post(
    '/process-payment',
    controller.processPayment
);

export default router;
