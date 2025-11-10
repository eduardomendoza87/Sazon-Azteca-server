// routes/articuloblog.routes.js

module.exports = app => {
    const articulosController = require('../controllers/articuloblog.controller.js');
    const router = require('express').Router();

    // (Frontend) Ruta para la LISTA de artículos (RF-06)
    // GET -> /api/relatos
    router.get('/', articulosController.findAllRelatos);

    // (Frontend) Ruta para el DETALLE del artículo (RF-07)
    // GET -> /api/relatos/receta-mole-poblano (por ejemplo)
    router.get('/:slug', articulosController.findOneBySlug);

    // URL base
    app.use('/api/relatos', router);
};