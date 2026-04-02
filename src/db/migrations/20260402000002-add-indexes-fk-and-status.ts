import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addIndex("verified_profiles", ["user_id"], {
      name: "idx_verified_profiles_user_id",
    });

    await queryInterface.addIndex("projects", ["owner_id"], {
      name: "idx_projects_owner_id",
    });

    await queryInterface.addIndex("projects", ["category_id"], {
      name: "idx_projects_category_id",
    });

    await queryInterface.addIndex("projects", ["status"], {
      name: "idx_projects_status",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex("verified_profiles", "idx_verified_profiles_user_id");
    await queryInterface.removeIndex("projects", "idx_projects_owner_id");
    await queryInterface.removeIndex("projects", "idx_projects_category_id");
    await queryInterface.removeIndex("projects", "idx_projects_status");
  },
};
