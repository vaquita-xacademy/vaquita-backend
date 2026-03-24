import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UserRole } from "../../types/enums";

export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password_hash!: string;
    public role!: UserRole;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);

export default User;