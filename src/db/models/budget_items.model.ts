import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class BudgetItem extends Model {
    public id!: number;
    public project_id!: number;
    public name!: string;
    public amount!: number; 
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

BudgetItem.init(
    {
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "projects", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "budget_items",
    }
);

export default BudgetItem;