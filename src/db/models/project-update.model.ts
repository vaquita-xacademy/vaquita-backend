import { makePaginate, PaginateOptions, PaginationConnection } from "sequelize-cursor-pagination";
import {sequelize} from "../sequelize";
import { DataTypes, Model } from "sequelize";

export class ProjectUpdate extends Model {
    public id!: number;
    public project_id!: number;
    public title!: string;
    public description!: string;
    public receipt_url?: string;
    public image_public_id?: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public readonly deleted_at?: Date;

    declare static paginate: (options: PaginateOptions<ProjectUpdate>) => Promise<PaginationConnection<ProjectUpdate>>;
    public static readonly attributes: string[] = [
        "id", "project_id", "title", "description", "receipt_url", "image_public_id", "created_at", "updated_at"
    ];
}
ProjectUpdate.paginate = makePaginate(ProjectUpdate);

ProjectUpdate.init (
    {
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "projects", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
         title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        receipt_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        image_public_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "project_updates",
        underscored: true,
        paranoid: true,
    }
)

export default ProjectUpdate;