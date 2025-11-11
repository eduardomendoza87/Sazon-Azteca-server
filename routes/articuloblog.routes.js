const { authJwt } = require('../middleware');
const articulosController = require('../controllers/articuloblog.controller.js');
const router = require('express').Router();


// --- RUTAS PÚBLICAS (Para Clientes) ---

// (RF-06) Ruta para la LISTA de artículos
router.get('/', articulosController.findAllRelatos);

// (RF-07) Ruta para el DETALLE del artículo
router.get('/:slug', articulosController.findOneBySlug);


// --- RUTAS PROTEGIDAS (Para Admin CMS) ---

router.post(
    '/',
    [authJwt.verifyToken], // ¡Protegido!
    articulosController.create
);

router.put(
    '/:slug',
    [authJwt.verifyToken], // ¡Protegido!
    articulosController.update
);

router.delete(
    '/:slug',
    [authJwt.verifyToken], // ¡Protegido!
    articulosController.delete
);


// (Dev) Conectamos el router a la app
module.exports = app => {
    app.use('/api/relatos', router);
};