// models/articuloblog.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticuloBlog extends Model {
    static associate(models) {
      // define association here
    }
  }
  ArticuloBlog.init({
    // --- Campos que ya tenías ---
    titulo: DataTypes.STRING,
    contenido: DataTypes.TEXT,       // Para el artículo completo
    imagenDestacada: DataTypes.STRING, // El frontend la usará como 'imagen'
    autor: DataTypes.STRING,

    // --- (DEV) Campos Faltantes (Requeridos por el Frontend) ---
    slug: {                          // Para la URL (ej. /relatos/mi-articulo)
      type: DataTypes.STRING,
      allowNull: false,
      unique: true                 // ¡No pueden existir dos slugs iguales!
    },
    descripcion: DataTypes.TEXT,     // Para la tarjeta de resumen (Stories.jsx)
    categoria: DataTypes.STRING,   // Para el badge de la tarjeta
    fecha: DataTypes.DATEONLY      // Fecha de publicación

  }, {
    sequelize,
    modelName: 'ArticuloBlog',
    tableName: 'articuloblogs' // Aseguramos que coincida con tu imagen
  });
  return ArticuloBlog;
};