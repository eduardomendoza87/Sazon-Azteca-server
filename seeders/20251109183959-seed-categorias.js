'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Usamos 'bulkInsert' para insertar múltiples filas a la vez
    await queryInterface.bulkInsert('categoria', [
      {
        id: 1, // (Dev) ¡Definimos el ID manualmente!
        nombre: 'Entradas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2, // (Dev) Así podemos predecir los IDs
        nombre: 'Platos Fuertes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Desayunos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Bebidas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Postres',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // 'down' borra TODOS los datos de la tabla 'categoria'
    await queryInterface.bulkDelete('categoria', null, {});
  }
};