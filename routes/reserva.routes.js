const { authJwt } = require('../middleware');
const reservaController = require('../controllers/reserva.controller.js');
const router = require('express').Router();

// --- RUTA PÚBLICA (Para Clientes) ---
// (RF-08) Ruta para CREAR una nueva reserva
// POST -> /api/reservas
router.post(
    '/',
    // (QA) ¡SIN GUARDIA! Esta ruta es pública.
    reservaController.create 
);


// --- RUTAS PROTEGIDAS (Para Admin CMS) ---

// (RF-15) Ruta para LEER TODAS las reservas (con filtros)
router.get(
    '/',
    [authJwt.verifyToken], // ¡Protegido!
    reservaController.findAll
);

// (RF-15) Ruta para LEER UNA reserva
router.get(
    '/:id',
    [authJwt.verifyToken], // ¡Protegido!
    reservaController.findOne
);

// (RF-15) Ruta para ACTUALIZAR UNA reserva

router.put(
    '/:id',
    [authJwt.verifyToken], // ¡Protegido!
    reservaController.update
);

// (RF-15) Ruta para ELIMINAR UNA reserva

router.delete(
    '/:id',
    [authJwt.verifyToken], // ¡Protegido!
    reservaController.delete
);


// (Dev) Conectamos el router a la app
module.exports = app => {
    app.use('/api/reservas', router);
};