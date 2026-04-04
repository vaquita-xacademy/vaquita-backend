import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { EntityType, VerifiedProfileStatus } from "../../types/enums";

export class VerifiedProfile extends Model {
    public id!: number;
    public legal_name!: string;
    public tax_id!: string;
    public document_url!: string;
    public status!: VerifiedProfileStatus;
    public entity_type!: EntityType;
    public user_id!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

VerifiedProfile.init(
    {
        legal_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        tax_id: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        document_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(VerifiedProfileStatus)),
            allowNull: false,
            defaultValue: VerifiedProfileStatus.PENDING
        },
        entity_type: {
            type: DataTypes.ENUM(...Object.values(EntityType)),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
    },
    {
        sequelize,
        tableName: "verified_profiles",
    }
);

export default VerifiedProfile;