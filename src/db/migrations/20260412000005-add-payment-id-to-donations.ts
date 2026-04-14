'use strict';
import { DataTypes, QueryInterface } from "sequelize";
import { PaymentStatus } from "../../types/enums";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("donations", "payment_id",{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "payments" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("payments", "payment_id");
  },
};
