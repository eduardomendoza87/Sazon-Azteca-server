'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // (PM) Por ahora no tiene asociaciones
    }
  }
  Usuario.init({
    // (QA/RNF-05) El email DEBE ser único
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // ¡Clave! Evita emails duplicados en la BD
      validate: {
        isEmail: true // Validación a nivel de Sequelize
      }
    },
    // (QA/RNF-04) El campo para la contraseña hasheada
    password: {
      type: DataTypes.STRING,
      allowNull: false 
    }
    // (PM) Podríamos añadir 'nombre', 'rol', etc. pero
    // para el login, email y password es lo único necesario.
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios' // Asegurémonos de que la tabla sea 'Usuarios' (plural)
  });
  return Usuario;
};