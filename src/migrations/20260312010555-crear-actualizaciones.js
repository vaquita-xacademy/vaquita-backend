'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Las actualizaciones guardan novedades publicadas sobre cada proyecto.
    await queryInterface.createTable('actualizaciones', {
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
      usuario_autor_id: {
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
      contenido: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      publicado_en: {
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

    // Este indice mejora la carga del timeline de un proyecto.
    await queryInterface.addIndex('actualizaciones', ['proyecto_id'], {
      name: 'actualizaciones_proyecto_id_idx',
    });

    // Este indice facilita auditoria y consultas por autor.
    await queryInterface.addIndex('actualizaciones', ['usuario_autor_id'], {
      name: 'actualizaciones_usuario_autor_id_idx',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('actualizaciones');
  }
};
