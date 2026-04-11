import { sequelize } from "../sequelize";
import Category from "./category.model";
import Project from "./project.model";
import User from "./user.model";
import VerifiedProfile from "./verified-profile.model";
import Organization from "./organization.model";
import OrganizationVerifiedProfile from "./organization-verified-profile.model";
import Donation from "./donation.model";

export function setupAssociations() {
  // User ↔ VerifiedProfile (1:1)
  User.hasOne(VerifiedProfile, { foreignKey: "user_id", as: "verified_profile" });
  VerifiedProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // User ↔ Organization (1:N)
  User.hasMany(Organization, { foreignKey: "owner_id", as: "organizations" });
  Organization.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

  // Organization ↔ OrganizationVerifiedProfile (1:1)
  Organization.hasOne(OrganizationVerifiedProfile, { foreignKey: "organization_id", as: "verified_profile" });
  OrganizationVerifiedProfile.belongsTo(Organization, { foreignKey: "organization_id", as: "organization" });

  // Organization ↔ Project (1:N)
  Organization.hasMany(Project, { foreignKey: "organization_id", as: "projects" });
  Project.belongsTo(Organization, { foreignKey: "organization_id", as: "organization" });

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
}

export {
  sequelize,
  User,
  VerifiedProfile,
  Project,
  Category,
  Organization,
  OrganizationVerifiedProfile,
  Donation,
};
