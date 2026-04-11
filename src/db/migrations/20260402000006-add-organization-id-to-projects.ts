'use strict';
import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("projects", "organization_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "organizations", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addIndex("projects", ["organization_id"], {
      name: "idx_projects_organization_id",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex("projects", "idx_projects_organization_id");
    await queryInterface.removeColumn("projects", "organization_id");
  },
};
