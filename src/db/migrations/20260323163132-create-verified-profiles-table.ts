'use strict';
import { DataTypes, QueryInterface } from "sequelize";
import { EntityType, VerifiedProfileStatus } from "../../types/enums";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("verified_profiles", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      legal_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      tax_id: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      document_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(VerifiedProfileStatus)),
        allowNull: false,
        defaultValue: VerifiedProfileStatus.PENDING
      },
      entity_type: {
        type: DataTypes.ENUM(...Object.values(EntityType)),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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
      }
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("verified_profiles");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_verified_profiles_status", "enum_verified_profiles_entity_type"');
  }
};
