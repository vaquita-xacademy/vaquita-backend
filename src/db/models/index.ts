import { sequelize } from "../sequelize";
import BudgetItem from "./budget_items.model";
import Category from "./category.model";
import Project from "./project.model";
import User from "./user.model";
import VerifiedProfile from "./verified-profile.model";
import Donation from "./donation.model";
import Payment from "./payment.model";

export function setupAssociations() {
  // User ↔ VerifiedProfile (1:1)
  User.hasOne(VerifiedProfile, { foreignKey: "user_id", as: "verified_profile" });
  VerifiedProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // User ↔ Project (1:N)
  User.hasMany(Project, { foreignKey: "owner_id", as: "projects" });
  Project.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

  // Category ↔ Project (1:N)
  Category.hasMany(Project, { foreignKey: "category_id", as: "projects" });
  Project.belongsTo(Category, { foreignKey: "category_id", as: "category_data" });

  // User (donor) ↔ Donation (1:N)
  User.hasMany(Donation, { foreignKey: "donor_id", as: "donations" });
  Donation.belongsTo(User, { foreignKey: "donor_id", as: "donor" });

  // Project ↔ Donation (1:N)
  Project.hasMany(Donation, { foreignKey: "project_id", as: "donations" });
  Donation.belongsTo(Project, { foreignKey: "project_id", as: "project" });

  Project.hasMany(BudgetItem, { foreignKey: "project_id", as: "budget_items" });
  BudgetItem.belongsTo(Project, { foreignKey: "project_id", as: "project" });

  Payment.hasOne(Donation, { foreignKey: "payment_id", as: "donation" });
  Donation.belongsTo(Payment, { foreignKey: "payment_id", as: "payment" });


}

export {
  sequelize,
  User,
  VerifiedProfile,
  Project,
  Category,
  Donation,
  BudgetItem,
  Payment
};
