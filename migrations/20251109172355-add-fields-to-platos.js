'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Usamos 'await' para asegurar que las operaciones se completen en orden
    
    // 1. (DEV) Renombramos 'nombre' a 'titulo' para que coincida con el frontend
    await queryInterface.renameColumn('Platos', 'nombre', 'titulo');
    
    // 2. (PM) Añadimos 'ingredientes', requerido por HistoryDish.jsx (RF-05)
    await queryInterface.addColumn('Platos', 'ingredientes', {
      type: Sequelize.TEXT,
      allowNull: true, // Puedes hacerlo 'false' si siempre tendrán este dato
    });
    
    // 3. (PM) Añadimos 'procedencia', requerido por HistoryDish.jsx (RF-05)
    await queryInterface.addColumn('Platos', 'procedencia', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // El 'down' debe revertir EXACTAMENTE lo que hicimos en 'up'
    
    // 1. Renombramos 'titulo' de vuelta a 'nombre'
    await queryInterface.renameColumn('Platos', 'titulo', 'nombre');
    
    // 2. Eliminamos la columna 'ingredientes'
    await queryInterface.removeColumn('Platos', 'ingredientes');
    
    // 3. Eliminamos la columna 'procedencia'
    await queryInterface.removeColumn('Platos', 'procedencia');
  }
};