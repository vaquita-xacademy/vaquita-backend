'use strict';

module.exports = (sequelize, DataTypes) => {
  const Actualizacion = sequelize.define(
    'Actualizacion',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuario_autor_id: {
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
      contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      publicado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'actualizaciones',
      underscored: true,
      timestamps: true,
    }
  );

  // Cada actualizacion pertenece a un proyecto y a un autor concreto.
  Actualizacion.associate = (models) => {
    Actualizacion.belongsTo(models.Proyecto, {
      foreignKey: 'proyecto_id',
      as: 'proyecto',
    });

    Actualizacion.belongsTo(models.Usuario, {
      foreignKey: 'usuario_autor_id',
      as: 'autor',
    });
  };

  return Actualizacion;
};
