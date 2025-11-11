const { authJwt } = require('../middleware');
const categoriaController = require('../controllers/categoria.controller.js');
const router = require('express').Router();

/**
 * (QA/RNF-03)
 * ¡Todas las rutas de Categorías están protegidas!
 * El guardia [authJwt.verifyToken] se ejecutará en cada llamada.
 */

// Crear una nueva Categoria
// POST -> /api/categorias
router.post(
    '/',
    [authJwt.verifyToken],
    categoriaController.create
);

// Obtener TODAS las Categorias
// GET -> /api/categorias
router.get(
    '/',
    [authJwt.verifyToken],
    categoriaController.findAll
);

// Obtener UNA Categoria por ID
// GET -> /api/categorias/1
router.get(
    '/:id',
    [authJwt.verifyToken],
    categoriaController.findOne
);

// Actualizar UNA Categoria por ID
// PUT -> /api/categorias/1
router.put(
    '/:id',
    [authJwt.verifyToken],
    categoriaController.update
);

// Eliminar UNA Categoria por ID
// DELETE -> /api/categorias/1
router.delete(
    '/:id',
    [authJwt.verifyToken],
    categoriaController.delete
);

// (Dev) Conectamos el router a la app
module.exports = app => {
    app.use('/api/categorias', router);
};