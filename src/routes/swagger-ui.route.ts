import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger";

const router = Router();

router.get("/api.json", (req, res) => {
    const { components, paths } = swaggerDocument as any;
    const { schemas, examples, responses } = components;
    res.setHeader("Content-Type", "application/json");
    res.send({ schemas, examples, responses, paths });
});

router.use("/", swaggerUi.serve, swaggerUi.setup(
    swaggerDocument, { swaggerOptions: { withCredentials: true } }
));

export default router;