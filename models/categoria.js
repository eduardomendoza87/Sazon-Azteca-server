'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
  
    static associate(models) {
      Categoria.hasMany(models.Plato, {
        foreignKey: 'categoriaId',
      });
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categoria',
  });
  return Categoria;
};