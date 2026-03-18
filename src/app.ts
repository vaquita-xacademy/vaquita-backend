import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsConfig from "./config/cors.config";
import appConfig from "./config/app.config";
import routes from "./routes";
import { sequelize } from "./db/sequelize";
import cookiesConfig from "./config/cookies.config";
import { passportConfig } from "./config/passport.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
// Cookie-parser es necesario para firmar y luego leer el JWT desde cookies.
app.use(cookieParser(cookiesConfig.secret));
// Passport queda listo para los endpoints protegidos que sigan.
app.use(passportConfig.initialize());

app.use("/api/v1", routes);

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Conexion a la base de datos establecida correctamente.");
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
