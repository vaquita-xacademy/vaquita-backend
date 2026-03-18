'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo_usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombre_completo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      correo_electronico: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      contrasena_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'active',
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'usuarios',
      underscored: true,
      timestamps: true,
      paranoid: true,
      // Excluimos el hash por defecto para evitar exposiciones accidentales.
      defaultScope: {
        attributes: {
          exclude: ['contrasena_hash'],
        },
      },
      scopes: {
        conContrasena: {
          attributes: {
            include: ['contrasena_hash'],
          },
        },
      },
    }
  );

  // Estas asociaciones reflejan el dominio principal del sistema.
  Usuario.associate = (models) => {
    Usuario.belongsTo(models.TipoUsuario, {
      foreignKey: 'tipo_usuario_id',
      as: 'tipoUsuario',
    });

    Usuario.hasMany(models.Proyecto, {
      foreignKey: 'usuario_responsable_id',
      as: 'proyectosResponsables',
    });

    Usuario.hasMany(models.Donacion, {
      foreignKey: 'usuario_donante_id',
      as: 'donations',
    });

    Usuario.hasMany(models.Actualizacion, {
      foreignKey: 'usuario_autor_id',
      as: 'actualizaciones',
    });
  };

  return Usuario;
};
