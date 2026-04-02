import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addConstraint("verified_profiles", {
      fields: ["user_id"],
      type: "unique",
      name: "uq_verified_profiles_user_id",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint(
      "verified_profiles",
      "uq_verified_profiles_user_id"
    );
  },
};
