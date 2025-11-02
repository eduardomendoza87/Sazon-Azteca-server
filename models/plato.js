'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
      // define association here
      Plato.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
      });
    }
  }
  Plato.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.DECIMAL,
    imagenUrl: DataTypes.STRING,
    historia: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Plato',
  });
  return Plato;
};