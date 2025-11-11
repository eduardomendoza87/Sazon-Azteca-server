// (Dev) Importamos el middleware "guardia"
const { authJwt } = require('../middleware');
const platosController = require('../controllers/plato.controller.js');
const router = require('express').Router();

// --- RUTAS PÚBLICAS (Para Clientes) ---
// (RF-03)
router.get('/', platosController.findAllPlatos);
// (RF-05)
router.get('/:id', platosController.findOnePlato);


// --- RUTAS PROTEGIDAS (Para Admin CMS) ---

// (RF-12 Create)
router.post(
    '/',
    [authJwt.verifyToken], // ¡Protegido!
    platosController.createPlato
);

// (RF-12 Update) 
router.put(
    '/:id',
    [authJwt.verifyToken], // ¡Protegido!
    platosController.updatePlato
);

// (RF-12 Delete) 
router.delete(
    '/:id',
    [authJwt.verifyToken], // ¡Protegido!
    platosController.deletePlato
);


// (Dev) Conectamos el router a la app
module.exports = app => {
    app.use('/api/platillos', router);
};