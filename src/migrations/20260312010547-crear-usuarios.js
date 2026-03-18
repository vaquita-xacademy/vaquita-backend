'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // La tabla usuarios concentra la identidad principal de acceso al sistema.
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo_usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      nombre_completo: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      correo_electronico: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      contrasena_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      dni: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'active',
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

    // Este indice acelera filtros y joins por tipo de usuario.
    await queryInterface.addIndex('usuarios', ['tipo_usuario_id'], {
      name: 'usuarios_tipo_usuario_id_idx',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
