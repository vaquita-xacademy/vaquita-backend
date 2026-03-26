import swaggerDocs, { Options } from "swagger-jsdoc";
import appConfig from "../config/app.config";
import tags from "./tags";
import schemas from "./components/schemas";
import examples from "./components/examples";
import responses from "./components/responses";
import paths from "./paths";

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vaquita API Documentation',
            version: '1.0.0',
            description: "API REST",
        },
        servers: [
            {
                url: `http://localhost:${appConfig.port}`,
                description: "Servidor de desarrollo (v1)",
            },
        ],
        tags: tags,
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "access_token",
                    description: "Autenticación mediante JWT almacenado en una cookie HTTP",
                },
            },
            schemas: schemas,
            examples: examples,
            responses: responses,
        },
        paths: paths
    },
    apis: []
};

export default swaggerDocs(options);