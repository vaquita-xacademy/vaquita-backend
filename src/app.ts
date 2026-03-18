import "dotenv/config";
import express from "express";
import cors from "cors";
import corsConfig from "./config/cors.config";
import appConfig from "./config/app.config";
import routes from "./routes";
import { sequelize } from "./db/sequelize";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use("/api", routes);

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("No se ha podido conectar a la base de datos");
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