import { DataTypes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../sequelize";
import { ProjectStatus } from "../../types/enums";
import Category from "./category.model";

export class Project extends Model {
    public id!: number;
    public owner_id!: number;
    public category_id!: number;
    public title!: string;
    public description!: string;
    public goal_amount!: number; //importe objetivo
    public current_amount!: number; //importe actual
    public image_url!: string;
    public status!: ProjectStatus;
    public slug!: string;
    public location_province!: string;
    public location_city!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    declare category_data?: NonAttribute<Category>;
}

Project.init(
    {
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        goal_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        current_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "categories", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(ProjectStatus)),
            allowNull: false,
            defaultValue: ProjectStatus.ACTIVE
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        location_province: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        location_city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "projects",
    }
);

export default Project;