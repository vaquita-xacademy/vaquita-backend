'use strict';

module.exports = (sequelize, DataTypes) => {
  const TipoUsuario = sequelize.define(
    'TipoUsuario',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'tipos_usuario',
      underscored: true,
      timestamps: true,
    }
  );

  // Esta relacion permite navegar del tipo hacia sus usuarios asociados.
  TipoUsuario.associate = (models) => {
    TipoUsuario.hasMany(models.Usuario, {
      foreignKey: 'tipo_usuario_id',
      as: 'usuarios',
    });
  };

  return TipoUsuario;
};
