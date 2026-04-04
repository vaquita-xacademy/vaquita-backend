import { QueryInterface, QueryTypes } from "sequelize";
import { ProjectStatus, UserRole } from "../../types/enums";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const now = new Date();
    const timestamps = { created_at: now, updated_at: now };

    const [user] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = :role LIMIT 1`, 
      {
        replacements: { role: UserRole.ADMIN },
        type: QueryTypes.SELECT, 
      }
    ) as {id: number}[];
    const userId = user.id; 
    const calculateProgress = (current: number, goal: number) => goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0;

    await queryInterface.bulkInsert('projects', [{
      owner_id: userId, 
        category_id: 1,
        title: "Mural Comunitario",
        description: "Queremos pintar un mural en la plaza central para embellecer el barrio y fomentar el arte local.",
        goal_amount: 1000.00,
        current_amount: 200.00,
        progress: calculateProgress(200,1000),
        image_url: "https://surl.li/yquvdd",
        status: ProjectStatus.ACTIVE,
        slug: "mural-comunitario-123",
        location: JSON.stringify({
          province: "La Pampa",
          city: "Santa Rosa"
        }),
        ...timestamps
      },
      {
        owner_id: userId,
        category_id: 2,
        title: "Reforestación del Parque",
        description: "Plantación de árboles para mejorar la calidad del aire y promover un espacio verde en la ciudad.",
        goal_amount: 5000.00,
        current_amount: 3450.00,
        progress: calculateProgress(2200, 5000),
        image_url: "https://surl.li/ocjfyt",
        status: ProjectStatus.ACTIVE,
        slug: "reforestacion-del-parque-365",
        location: JSON.stringify({
          province: "Mendoza",
          city: "Mendoza"
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
        progress: calculateProgress(5000,20000),
        image_url: "https://surl.li/myqaaz",
        status: ProjectStatus.PAUSED,
        slug: "construccion-de-viviendas-105",
        location: JSON.stringify({
          province: "Entre Ríos",
          city: "Concordia"
        }),
        ...timestamps
      },
      {
        owner_id: userId,
        category_id: 6,
        title: "Campaña de Limpieza de Ríos",
        description: "Limpieza de ríos y arroyos para mejorar el ecosistema local y la salud pública.",
        goal_amount: 4000.00,
        current_amount: 3800.00,
        progress: calculateProgress(3800,4000),
        image_url: "https://surl.lu/jefftt",
        status: ProjectStatus.ACTIVE,
        slug: "campana-limpieza-rios-991",
        location: JSON.stringify({
          province: "Santa Fe",
          city: "Rosario"
        }),
        ...timestamps
      },
       {
        owner_id: userId,
        category_id: 1,
        title: "Protección de fauna patagónica",
        description: "Programa de conservación de especies autóctonas",
        goal_amount: 8000.00,
        current_amount: 64000.00,
        progress: calculateProgress(6400,8000),
        image_url: "https://surl.li/dxpvsi",
        status: ProjectStatus.ACTIVE,
        slug: "proteccion-de-fauna-patagonica-168",
        location: JSON.stringify({
          province: "Santa Cruz",
          city: "El Calafate"
        }),
        ...timestamps
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('projects', {});
  }
};