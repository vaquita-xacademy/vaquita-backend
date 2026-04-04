import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("projects", "slug", {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("projects", "slug", {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    });
  },
};
