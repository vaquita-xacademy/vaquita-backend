'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Las donaciones conectan a un usuario donante con un proyecto concreto.
    await queryInterface.createTable('donaciones', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      proyecto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proyectos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      usuario_donante_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      monto: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      moneda: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'ARS',
      },
      estado_pago: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'pending',
      },
      referencia_pago: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      donado_en: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
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
    });

    // Este indice agiliza el total de donaciones por proyecto.
    await queryInterface.addIndex('donaciones', ['proyecto_id'], {
      name: 'donaciones_proyecto_id_idx',
    });

    // Este indice agiliza la consulta del historial por donante.
    await queryInterface.addIndex('donaciones', ['usuario_donante_id'], {
      name: 'donaciones_usuario_donante_id_idx',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('donaciones');
  }
};
