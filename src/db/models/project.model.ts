import { DataTypes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../sequelize";
import { ProjectStatus } from "../../types/enums";
import Category from "./category.model";
import { makePaginate, PaginateOptions, PaginationConnection } from "sequelize-cursor-pagination";

export interface Location {
    province: string;
    city: string;
}

export class Project extends Model {
    public id!: number;
    public owner_id!: number;
    public organization_id!: number | null;
    public category_id!: number;
    public title!: string;
    public description!: string;
    public goal_amount!: number;
    public current_amount!: number;
    public image_url!: string;
    public status!: ProjectStatus;
    public slug!: string;
    public location!: Location;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    declare category_data?: NonAttribute<Category>;
    declare static paginate: (options: PaginateOptions<Project>) => Promise<PaginationConnection<Project>>;

    public static readonly attributes: string[] = [
        "id", "owner_id", "title", "description", "goal_amount", "current_amount",
        "image_url", "status", "slug", "location", "created_at", "updated_at"
    ];

    public static readonly cardAttributes: string[] = [
        "id", "title", "image_url", "status", "slug", "location", "created_at", "updated_at"
    ];

}
Project.paginate = makePaginate(Project);

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
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "organizations", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        slug: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        location: {
            type: DataTypes.JSONB,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "projects",
    }
);

export default Project;