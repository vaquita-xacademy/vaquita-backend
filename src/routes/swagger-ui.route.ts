import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger";

const router = Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(
    swaggerDocument, { swaggerOptions: { withCredentials: true } }
));

export default router;