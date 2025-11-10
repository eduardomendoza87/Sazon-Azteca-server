'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Platos', [
      // (Dev) Usamos los datos de tu frontend
      {
        titulo: "Pozole de Puerco Tradicional",
        descripcion: "Un clásico de las fiestas mexicanas...",
        precio: 120.00,
        imagenUrl: "/images/menu_pozole.jpg", // (Dev) Usamos rutas relativas
        historia: "El Pozole no es solo un platillo, es un ritual prehispánico...",
        ingredientes: "Maíz cacahuazintle criollo, Cabeza de Puerco...",
        procedencia: "Este platillo tiene sus raíces en el México prehispánico...",
        // (Dev) ¡LA CLAVE! Sabemos que "Platos Fuertes" es el ID 2
        categoriaId: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: "Mole Negro Oaxaqueño Ceremonial",
        descripcion: "Una joya de la gastronomía mexicana...",
        precio: 150.00,
        imagenUrl: "/images/menu_mole.jpg",
        historia: "El Mole es la máxima expresión de la complejidad y la fusión...",
        ingredientes: "Trilogía de Chiles Secos (Mulato, Pasilla, Ancho)...",
        procedencia: "Este platillo es el alma de los Valles Centrales de Oaxaca...",
        categoriaId: 2, // (Dev) También es "Platos Fuertes"
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: "Chilaquiles Verdes con Huevo",
        descripcion: "Crujientes totopos bañados en salsa verde...",
        precio: 95.00,
        imagenUrl: "/images/menu_chilaquiles_verdes.jpg",
        historia: "Los Chilaquiles (del náhuatl *chīlāquiliztli*) nacen de la necesidad...",
        ingredientes: "Totopos de Maíz nixtamalizado, Salsa Verde fresca...",
        procedencia: "Un platillo fundamental en toda la República Mexicana...",
        categoriaId: 3, // (Dev) Este es "Desayunos"
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // 'down' borra TODOS los datos de la tabla 'Platos'
    await queryInterface.bulkDelete('Platos', null, {});
  }
};