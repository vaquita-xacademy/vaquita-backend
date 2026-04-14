'use strict';
import { DataTypes, QueryInterface } from "sequelize";
import { PaymentStatus } from "../../types/enums";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("payments", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("payments");
  },
};
