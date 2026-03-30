import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    const now = new Date;
    const timestamps = { created_at: now, updated_at: now };
    await queryInterface.bulkInsert('categories', [
      { 
        name: "Ecología", 
        ...timestamps 
      },
      { 
        name: "Arte", 
        ...timestamps 
      },
      { 
        name: "Salud", 
        ...timestamps 
      },
      { 
        name: "Animales", 
        ...timestamps 
      },
      { 
        name: "Educación", 
        ...timestamps 
      },
      { 
        name: "Deportes", 
        ...timestamps 
      },
      { 
        name: "Comunidad", 
        ...timestamps 
      },
    ]);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('categories', {});
  }
};
