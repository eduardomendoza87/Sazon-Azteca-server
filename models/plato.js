// models/plato.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plato extends Model {
    static associate(models) {
      // (DEV) Aquí le decimos que un Plato pertenece a una Categoria
      Plato.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId', // Esta es la columna que nos conecta
        as: 'categoria' // Un alias opcional pero útil
      });
    }
  }
  Plato.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.DECIMAL,
    imagenUrl: DataTypes.STRING,
    historia: DataTypes.TEXT,
    
    
    ingredientes: DataTypes.TEXT,
    procedencia: DataTypes.TEXT,

    
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'categoria',
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Plato',
    tableName: 'Platos' 
  });
  return Plato;
};