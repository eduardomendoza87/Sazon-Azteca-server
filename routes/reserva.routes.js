// routes/reserva.routes.js

// (Dev) ¡Esto es lo que arregla el TypeError!
// Estamos exportando una función que 'server.js' puede ejecutar.
module.exports = app => {
    const reservaController = require('../controllers/reserva.controller.js');
    const router = require('express').Router();

    // Ruta para CREAR una nueva reserva (RF-08)
    // POST -> /api/reservas
    router.post('/', reservaController.createReserva);

    // --- (PM) Aquí irán las rutas del Admin CMS (RF-15) ---
    // GET -> /api/reservas (Para ver todas)
    // router.get('/', reservaController.findAllReservas); 

    // URL base
    app.use('/api/reservas', router);
};