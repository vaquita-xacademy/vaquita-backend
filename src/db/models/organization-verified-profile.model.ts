import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { EntityType, VerifiedProfileStatus } from "../../types/enums";

export class OrganizationVerifiedProfile extends Model {
    public id!: number;
    public organization_id!: number;
    public legal_name!: string;
    public tax_id!: string;
    public document_url!: string;
    public entity_type!: EntityType;
    public status!: VerifiedProfileStatus;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

OrganizationVerifiedProfile.init(
    {
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: { model: "organizations", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        legal_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        tax_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        document_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        entity_type: {
            type: DataTypes.ENUM(...Object.values(EntityType)),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(VerifiedProfileStatus)),
            allowNull: false,
            defaultValue: VerifiedProfileStatus.PENDING,
        },
    },
    {
        sequelize,
        tableName: "organization_verified_profiles",
    }
);

export default OrganizationVerifiedProfile;
