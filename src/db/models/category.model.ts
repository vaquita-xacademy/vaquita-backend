import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { capitalizeText } from "../../helpers/text-transform";

export class Category extends Model {
    public id!: number;
    public name!: string;
    public icon_name?: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public readonly deleted_at?: Date;
}

Category.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        icon_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "categories",
        paranoid: true,
        hooks: {
            beforeSave: (category: Category) => {
                category.name = capitalizeText(category.name);
            },
        },
    }
);

export default Category;