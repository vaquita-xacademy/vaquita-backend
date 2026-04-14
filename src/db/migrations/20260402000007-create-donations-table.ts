'use strict';
import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("donations", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      donor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "projects", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex("donations", ["donor_id"], {
      name: "idx_donations_donor_id",
    });

    await queryInterface.addIndex("donations", ["project_id"], {
      name: "idx_donations_project_id",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex("donations", "idx_donations_donor_id");
    await queryInterface.removeIndex("donations", "idx_donations_project_id");
    await queryInterface.dropTable("donations");
  },
};
