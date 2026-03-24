import { sequelize } from "../sequelize";
import User from "./user.model";
import VerifiedProfile from "./verified-profile.model";

export function setupAssociations() {
  // Setear relaciones

  // Ejemplo
  User.hasOne(VerifiedProfile, { foreignKey: "user_id", as: "verified_profile" });
  VerifiedProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

};

export {
  sequelize,
  User,
  VerifiedProfile
};