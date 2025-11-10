// routes/auth.routes.js
module.exports = app => {
    const authController = require('../controllers/auth.controller.js');
    const router = require('express').Router();

    // (Dev) Ruta para registrar un nuevo admin
    // POST -> /api/auth/register
    router.post('/register', authController.register);

    // (Dev) Aquí irá nuestra ruta de login
    // router.post('/login', authController.login);
    router.post('/login', authController.login);

    app.use('/api/auth', router);
};