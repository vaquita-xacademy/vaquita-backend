import { Sequelize } from "sequelize";
import { sequelizeConfig } from "./sequelize.config";

export const sequelize: Sequelize = new Sequelize(sequelizeConfig);