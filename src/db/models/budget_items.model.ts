import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { normalizeText } from "../../helpers/text-transform";

export class BudgetItem extends Model {
    public id!: number;
    public project_id!: number;
    public name!: string;
    public quantity!: number; 
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: "budget_items",
        hooks: {
            beforeSave: (budgetItem: BudgetItem) => {
                if (budgetItem.name) { budgetItem.name = normalizeText(budgetItem.name); }
            }
        }
    }
);

export default BudgetItem;