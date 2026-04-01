import { sequelize } from "../sequelize";
import BudgetItem from "./budget_items.model";
import Category from "./category.model";
import Project from "./project.model";
import User from "./user.model";
import VerifiedProfile from "./verified-profile.model";

export function setupAssociations() {
  // Setear relaciones

  // Ejemplo
  User.hasOne(VerifiedProfile, { foreignKey: "user_id", as: "verified_profile" });
  VerifiedProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

  //Projects
  User.hasMany(Project, { foreignKey: "owner_id", as: "projects" });
  Project.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

  //Categories
  Category.hasMany(Project, { foreignKey: "category_id", as: "projects" });
  Project.belongsTo(Category, { foreignKey: "category_id", as: "category_data" });

  //Budget Items
  Project.hasMany(BudgetItem, { foreignKey: "project_id", as: "budget_items" });
  BudgetItem.belongsTo(Project, { foreignKey: "project_id", as: "project" });

};

export {
  sequelize,
  User,
  VerifiedProfile,
  Project,
  Category,
  BudgetItem
};