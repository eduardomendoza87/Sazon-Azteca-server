'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
  
    static associate(models) {
    }
  }
  Reserva.init({
    nombreCliente: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    fechaHora: DataTypes.DATE,
    numPersonas: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reserva',
    tableName: 'reservas',
  });
  return Reserva;
};