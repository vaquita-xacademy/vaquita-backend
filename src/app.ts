import "reflect-metadata";
import "dotenv/config";
import { validateEnv } from "./config/env.validation";
validateEnv();
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import corsConfig from "./config/cors.config";
import appConfig from "./config/app.config";
import cookieParser from "cookie-parser";
import cookieConfig from "./config/cookies.config";
import routes from "./routes";
import { sequelize, setupAssociations } from "./db/models";
import swaggerUiRoute from "./routes/swagger-ui.route";
import { HttpException } from "./exceptions";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use(cookieParser(cookieConfig.secret));

// Rutas de la API
app.use("/api/v1", routes);

// Swagger UI
app.use("/api/v1/docs", swaggerUiRoute);

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpException) {
        return res.status(err.status).json({ message: err.message });
    }
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Error interno del servidor" });
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
        setupAssociations();
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
        throw error;
    }
};

const startServer = async () => {
    await initializeDatabase();
    app.listen(appConfig.port, () => {
        console.log(`Servidor corriendo en puerto: ${appConfig.port}`);
        console.log(`Documentacion de la API: http://localhost:${appConfig.port}/api/v1/docs`);
        console.log(`JSON de la API: http://localhost:${appConfig.port}/api/v1/docs/api.json`);
    });
};

startServer()
    .catch((error) => {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    });

export default app;