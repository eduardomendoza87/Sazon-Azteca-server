'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticuloBlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticuloBlog.init({
    titulo: DataTypes.STRING,
    contenido: DataTypes.TEXT,
    imagenDestacada: DataTypes.STRING,
    autor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ArticuloBlog',
  });
  return ArticuloBlog;
};