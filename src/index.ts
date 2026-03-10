import "dotenv/config";
import express from "express";
import cors from "cors";
import corsConfig from "./config/cors.config";
import appConfig from "./config/app.config";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use("/api", routes);

const startServer = async () => {
    app.listen(appConfig.port, () => {
        console.log(`Servidor corriendo en puerto: ${appConfig.port}`);
    });
};

startServer()
    .catch((error) => {
        console.error("Error al iniciar el servidor:", error);
    });

export default app;