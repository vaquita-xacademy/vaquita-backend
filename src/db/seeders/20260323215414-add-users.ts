import { QueryInterface } from "sequelize";
import { UserRole } from "../../types/enums";
import { hashSync } from "bcrypt";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const now = new Date;
    const timestamps = { created_at: now, updated_at: now };
    const hashedPassword = hashSync("vaquita1A_", 10);
    await queryInterface.bulkInsert('users', [
      {
        name: "Juan",
        email: "juan@example.com",
        password_hash: hashedPassword,
        role: UserRole.DONOR,
        ...timestamps
      },
      {
        name: "Nahuel",
        email: "nahuel@example.com",
        password_hash: hashedPassword,
        role: UserRole.ADMIN,
        ...timestamps
      },
      {
        name: "Jimena",
        email: "jimena@example.com",
        password_hash: hashedPassword,
        role: UserRole.OWNER,
        ...timestamps
      },
    ])
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {});
  }
};
