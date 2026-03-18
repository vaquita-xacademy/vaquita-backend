'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Cada proyecto representa una causa con meta de recaudacion y responsable.
    await queryInterface.createTable('proyectos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_responsable_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      titulo: {
        type: Sequelize.STRING(180),
        allowNull: false,
      },
      resumen: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      monto_objetivo: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      monto_actual: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      estado: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'draft',
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      fecha_fin: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      url_imagen_portada: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Este indice ayuda a listar proyectos por usuario responsable.
    await queryInterface.addIndex('proyectos', ['usuario_responsable_id'], {
      name: 'proyectos_usuario_responsable_id_idx',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('proyectos');
  }
};
