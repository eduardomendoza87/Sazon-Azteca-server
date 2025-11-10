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
    // (DEV) Renombrado para que coincida con el frontend (de la migración 2)
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.DECIMAL,
    imagenUrl: DataTypes.STRING,
    historia: DataTypes.TEXT,
    
    // (DEV) Añadidos de la migración 2
    ingredientes: DataTypes.TEXT,
    procedencia: DataTypes.TEXT,

    // (DEV) ¡LA CORRECCIÓN QUE FALTABA!
    // El modelo DEBE saber sobre la columna de la llave foránea
    // que definimos en la migración 'create-plato'.
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false, // O 'true' si lo permitiste en la migración
      references: {
        model: 'categoria', // Debe coincidir EXACTAMENTE con el nombre de la tabla
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Plato',
    tableName: 'Platos' // Es buena práctica definirlo explícitamente
  });
  return Plato;
};