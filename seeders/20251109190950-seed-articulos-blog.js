// seeders/[...]-seed-articulos-blog.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('articuloblogs', [ // ¡Nombre de tabla en minúsculas!
      {
        slug: "receta-mole-poblano",
        titulo: "Receta para el mole poblano",
        categoria: "Receta",
        imagenDestacada: "/images/articulos/menu_mole.jpg", // CORREGIDO
        descripcion: "Descubre los secretos del auténtico mole poblano...",
        autor: "Adolfo Lopez",
        contenido: "<div class='mt-12...'>...Pasos...</div>", // CORREGIDO
        fecha: "2025-11-01",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        slug: "ingredientes-mas-usados",
        titulo: "Ingredientes mas usados en el año 2025",
        categoria: "Investigacion",
        imagenDestacada: "/images/articulos/investigacion_ingredientes.jpg", // CORREGIDO
        descripcion: "Explora los ingredientes más utilizados...",
        autor: "Jorge Ruiz",
        contenido: "<p class='text-xl mb-6'>Nuestra investigación...</p>", // CORREGIDO
        fecha: "2025-11-05",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... (puedes añadir el de enchiladas si quieres) ...
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articuloblogs', null, {});
  }
};