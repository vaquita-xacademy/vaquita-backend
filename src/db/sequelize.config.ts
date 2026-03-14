import { env } from "process";
import { Options } from "sequelize";

export const sequelizeConfig: Options = {
    dialect: "postgres",
    host: env.DB_HOST ?? "localhost",
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
    database: env.DB_NAME ?? "vaquita_db",
    username: env.DB_USERNAME ?? "postgres",
    password: env.DB_PASSWORD ?? "postgres",
    logging: false,
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
};