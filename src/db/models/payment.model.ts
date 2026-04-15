import { DataTypes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../sequelize";
import { PaymentStatus } from "../../types/enums";

export class Payment extends Model {
    public id!: number;
    public project_id!: number;
    public status!: PaymentStatus;
    public amount!: number;
    public currency!: string;
    public external_reference!: string;
    public provider_payment_id!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Payment.init(
    {
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "projects" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        status: {
            type: DataTypes.ENUM(...Object.values(PaymentStatus)),
            allowNull: false,
            defaultValue: PaymentStatus.PENDING,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
            defaultValue: "ARS",
        },
        external_reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        provider_payment_id: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "payments",
    }
);

export default Payment;
