import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable('categories', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      icon_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    });
    await queryInterface.addIndex("categories", ["name"], {
        unique: true,
        where: {
          deleted_at: null,
        }, 
        name: "unique_active_category_name"
      });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeIndex("categories", "unique_active_category_name");
    await queryInterface.dropTable('categories');
  }
};
