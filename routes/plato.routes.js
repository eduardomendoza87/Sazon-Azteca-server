// routes/plato.routes.js

// (Dev) Este archivo solo define las URLs, no la lógica.
module.exports = app => {
    const { authJwt } = require('../middleware');
    const platosController = require('../controllers/plato.controller.js');
    const router = require('express').Router();

    // (Frontend) Cuando llegue una petición GET a '/',
    // ejecuta la función 'findAllPlatos' del controlador.
    router.get('/', platosController.findAllPlatos);

    // --- (DEV) NUEVA RUTA PARA EL DETALLE DEL PLATO (RF-05) ---
    router.get('/:id', platosController.findOnePlato);

router.post(
    '/',
     [authJwt.verifyToken],
     platosController.createPlato
);
    // (Dev) Esta es la URL base para todas las rutas en este archivo.
    // (Frontend) Así, tu React llamará a:
    // http://localhost:8080/api/platillos
    app.use('/api/platillos', router);
};