'use strict';
import { DataTypes, QueryInterface } from "sequelize";
import { EntityType, VerifiedProfileStatus } from "../../types/enums";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("organization_verified_profiles", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: "organizations", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      legal_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      tax_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      document_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      entity_type: {
        type: DataTypes.ENUM(...Object.values(EntityType)),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(VerifiedProfileStatus)),
        allowNull: false,
        defaultValue: VerifiedProfileStatus.PENDING,
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

    await queryInterface.addIndex("organization_verified_profiles", ["organization_id"], {
      name: "idx_org_verified_profiles_organization_id",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex("organization_verified_profiles", "idx_org_verified_profiles_organization_id");
    await queryInterface.dropTable("organization_verified_profiles");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_organization_verified_profiles_status", "enum_organization_verified_profiles_entity_type"');
  },
};
