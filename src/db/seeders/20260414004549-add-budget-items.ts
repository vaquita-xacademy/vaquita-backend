import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:  QueryInterface) {
    const now = new Date;
    const timestamps = { created_at: now, updated_at: now };

    await queryInterface.bulkInsert('budget_items', [
      {
        project_id: 1,
        name: "Pinturas y pinceles",
        quantity: 15,
        ...timestamps
      },
      {
        project_id: 1,
        name: "Material de limpieza",
        quantity: 50,
        ...timestamps
      },
      {
        project_id: 1,
        name: "Escalera",
        quantity: 1,
        ...timestamps
      },
      {
        project_id: 1,
        name: "Rodillos",
        quantity: 30, 
        ...timestamps
      },
      {
        project_id: 1,
        name: "Mascarillas",
        quantity: 100,
        ...timestamps
      },
      {
        project_id: 2,
        name: "Compra de plantines nativos",
        quantity: 1200,
        ...timestamps
      },
      {
        project_id: 2,
        name: "Herramientas (palas, guantes, regaderas)",
        quantity: 80,
        ...timestamps
      },
      {
        project_id: 2,
        name: "Transporte al área de reforestación",
        quantity: 2,
        ...timestamps
      },
      {
        project_id: 2,
        name: "Sistema de riego inicial",
        quantity: 1,
        ...timestamps
      },
      {
        project_id: 2,
        name: "Material educativo y señalización",
        quantity: 50,
        ...timestamps
      },
      {
        project_id: 3,
        name: "Ladrillos",
        quantity: 5000,
        ...timestamps
      },
      {
        project_id: 3,
        name: "Cemento",
        quantity: 200,
        ...timestamps
      },
      {
        project_id: 3,
        name: "Madera",
        quantity: 15,
        ...timestamps
      },
      {
        project_id: 3,
        name: "Tejas",
        quantity: 40,
        ...timestamps
      },
      {
        project_id: 4,
        name: "Bolsas de basura resistentes",
        quantity: 100,
        ...timestamps
      },
      {
        project_id: 4,
        name: "Guantes de trabajo",
        quantity: 12,
        ...timestamps
      },
      {
        project_id: 4,
        name: "Botiquín de primeros auxilios",
        quantity: 5,
        ...timestamps
      },
      {
        project_id: 4,
        name: "Material de limpieza",
        quantity: 50,
        ...timestamps
      },
      {
        project_id: 5,
        name: "Cámaras trampa",
        quantity: 12,
        ...timestamps
      },
      {
        project_id: 5,
        name: "Collares GPS",
        quantity: 12,
        ...timestamps
      },
      {
        project_id: 5,
        name: "Material de campo",
        quantity: 10,
        ...timestamps
      },
      {
        project_id: 5,
        name: "Capacitación y logística",
        quantity: 25,
        ...timestamps
      },
    ]);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('budget_items', {});
  }
};
