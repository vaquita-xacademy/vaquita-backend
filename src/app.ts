import "dotenv/config";
import express from "express";
import cors from "cors";
import corsConfig from "./config/cors.config";
import appConfig from "./config/app.config";
import routes from "./routes";
import { sequelize, setupAssociations } from "./db/models";
import swaggerUiRoute from "./routes/swagger-ui.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// Rutas de la API
app.use("/api/v1", routes);

// Swagger UI
app.use("/api/v1/docs", swaggerUiRoute);

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
        setupAssociations();
    } catch (error) {
        console.error("No se pudo conectar a la base de datos");
    }
};

const startServer = async () => {
    await initializeDatabase();
    app.listen(appConfig.port, () => {
        console.log(`Servidor corriendo en puerto: ${appConfig.port}`);
    });
};

startServer()
    .catch((error) => {
        console.error("Error al iniciar el servidor:", error);
    });

export default app;