import { DataTypes, QueryInterface } from "sequelize";
import { ProjectStatus } from "../../types/enums";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("projects", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      goal_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      current_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      progress_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "categories" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(ProjectStatus)),
        allowNull: false,
        defaultValue: ProjectStatus.ACTIVE
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      location: {
        type: DataTypes.JSONB,
        allowNull: false,
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

    await queryInterface.addIndex("projects", ["location"],{
      using: "GIN",
      name: "idx_projects_location",
      operator: "jsonb_path_ops"
    })

    await queryInterface.addIndex("projects", ["progress_percentage", "status"], {
      name: "idx_projects_progress_status",
    })
  },
  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable("projects");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_projects_status"');
  }
};
