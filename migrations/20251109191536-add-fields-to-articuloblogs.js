// migrations/[...]-add-fields-to-articuloblogs.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('articuloblogs', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn('articuloblogs', 'descripcion', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('articuloblogs', 'categoria', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('articuloblogs', 'fecha', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('articuloblogs', 'slug');
    await queryInterface.removeColumn('articuloblogs', 'descripcion');
    await queryInterface.removeColumn('articuloblogs', 'categoria');
    await queryInterface.removeColumn('articuloblogs', 'fecha');
  }
};