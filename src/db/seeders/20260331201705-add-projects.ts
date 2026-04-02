import { QueryInterface, QueryTypes } from "sequelize";
import { ProjectStatus, UserRole } from "../../types/enums";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const now = new Date();
    const timestamps = { created_at: now, updated_at: now };

    // Buscar un usuario con el rol 'ADMIN'
    const [user] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = :role LIMIT 1`, 
      {
        replacements: { role: UserRole.ADMIN },
        type: QueryTypes.SELECT, 
      }
    ) as {id: number}[];
    const userId = user.id; // ID del usuario ADMIN encontrado

    await queryInterface.bulkInsert('projects', [{
      owner_id: userId, 
        category_id: 1,
        title: "Mural Comunitario",
        description: "Queremos pintar un mural en la plaza central para embellecer el barrio y fomentar el arte local.",
        goal_amount: 1000.00,
        current_amount: 200.00,
        progress: 20,
        image_url: "https://example.com/mural.jpg",
        status: ProjectStatus.ACTIVE,
        slug: "mural-comunitario-123",
        location: JSON.stringify({
          province: "Entre Ríos",
          city: "Concordia"
        }),
        ...timestamps
      },
      {
        owner_id: userId,
        category_id: 2,
        title: "Reforestación del Parque",
        description: "Plantación de árboles para mejorar la calidad del aire y promover un espacio verde en la ciudad.",
        goal_amount: 5000.00,
        current_amount: 1200.00,
        progress: 24,
        image_url: "https://example.com/reforestacion.jpg",
        status: ProjectStatus.ACTIVE,
        slug: "reforestacion-del-parque-365",
        location: JSON.stringify({
          province: "Buenos Aires",
          city: "La Plata"
        }),
        ...timestamps
      },
      {
        owner_id: userId,
        category_id: 3,
        title: "Construcción de Viviendas",
        description: "Proyectos de viviendas económicas para familias en situación de vulnerabilidad.",
        goal_amount: 20000.00,
        current_amount: 5000.00,
        progress: 25, 
        image_url: "https://example.com/viviendas.jpg",
        status: ProjectStatus.ACTIVE,
        slug: "construccion-de-viviendas-105",
        location: JSON.stringify({
          province: "Entre Ríos",
          city: "Concordia"
        }),
        ...timestamps
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('projects', {});
  }
};