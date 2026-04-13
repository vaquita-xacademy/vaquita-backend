import { DataTypes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../sequelize";
import User from "./user.model";
import Project from "./project.model";

export class Donation extends Model {
    public id!: number;
    public donor_id!: number;
    public project_id!: number;
    public amount!: number;
    public message!: string | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    declare donor?: NonAttribute<User>;
    declare project?: NonAttribute<Project>;
}

Donation.init(
    {
        donor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "projects", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "donations",
    }
);

export default Donation;
