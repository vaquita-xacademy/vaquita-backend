'use strict';

module.exports = (sequelize, DataTypes) => {
  const Proyecto = sequelize.define(
    'Proyecto',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_responsable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING(180),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      resumen: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      monto_objetivo: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      monto_actual: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      estado: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'draft',
      },
      fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      url_imagen_portada: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'proyectos',
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  // Un proyecto conoce a su responsable, sus donaciones y sus novedades.
  Proyecto.associate = (models) => {
    Proyecto.belongsTo(models.Usuario, {
      foreignKey: 'usuario_responsable_id',
      as: 'responsable',
    });

    Proyecto.hasMany(models.Donacion, {
      foreignKey: 'proyecto_id',
      as: 'donaciones',
    });

    Proyecto.hasMany(models.Actualizacion, {
      foreignKey: 'proyecto_id',
      as: 'actualizaciones',
    });
  };

  return Proyecto;
};
