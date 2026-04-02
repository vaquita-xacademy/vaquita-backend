import { DataTypes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../sequelize";
import OrganizationVerifiedProfile from "./organization-verified-profile.model";

export class Organization extends Model {
    public id!: number;
    public owner_id!: number;
    public name!: string;
    public description!: string | null;
    public logo_url!: string | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    declare verified_profile?: NonAttribute<OrganizationVerifiedProfile>;
}

Organization.init(
    {
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        logo_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "organizations",
    }
);

export default Organization;
