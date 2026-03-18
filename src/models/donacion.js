'use strict';

module.exports = (sequelize, DataTypes) => {
  const Donacion = sequelize.define(
    'Donacion',
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
      usuario_donante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monto: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      moneda: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'ARS',
      },
      estado_pago: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'pending',
      },
      referencia_pago: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      donado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'donaciones',
      underscored: true,
      timestamps: true,
    }
  );

  // La donacion apunta tanto al proyecto destino como al usuario que aporta.
  Donacion.associate = (models) => {
    Donacion.belongsTo(models.Proyecto, {
      foreignKey: 'proyecto_id',
      as: 'proyecto',
    });

    Donacion.belongsTo(models.Usuario, {
      foreignKey: 'usuario_donante_id',
      as: 'donante',
    });
  };

  return Donacion;
};
