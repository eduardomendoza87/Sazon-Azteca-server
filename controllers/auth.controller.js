const db = require('../models');
const Usuario = db.Usuario;
const bcrypt = require('bcryptjs'); // Importamos bcrypt para hashear
const jwt = require('jsonwebtoken'); // Importamos JWT para los tokens

// Importamos la clave secreta desde tu archivo .env
require('dotenv').config();
const AUTH_SECRET = process.env.AUTH_SECRET;

/**
 * 1. REGISTRAR un nuevo usuario (para el Admin)
 * Ruta: POST /api/auth/register
 */
exports.register = async (req, res) => {
    // Recibimos email y password del body
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }

    try {
        // (RNF-04) Hasheamos la contraseña
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Creamos el usuario en la BD
        const nuevoUsuario = await Usuario.create({
            email: email,
            password: hashedPassword // Guardamos el hash
        });

        // ¡Éxito!
        res.status(201).json({
            message: `Usuario ${nuevoUsuario.email} creado con éxito.`
        });

    } catch (error) {
        // Manejo de errores
        if (error.name === 'SequelizeUniqueConstraintError') {
            // (QA) Esto se activa si el email ya existe
            return res.status(409).json({ // 409 = Conflicto
                message: "Error: El email ya está en uso."
            });
        }
        // Error genérico
        console.error("Error en el registro:", error.message);
        res.status(500).json({
            message: "Error interno al registrar el usuario."
        });
    }
};


/**
 * 2. INICIAR SESIÓN (para el Admin)
 * Ruta: POST /api/auth/login
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validación
    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }

    try {
        // 1. Buscar al usuario por email
        const usuario = await Usuario.findOne({ where: { email: email } });

        // 2. Verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // 3. (RNF-04) Comparar la contraseña del formulario con la hasheada en la BD
        const passwordIsValid = bcrypt.compareSync(
            password,        // La contraseña del formulario
            usuario.password // La contraseña hasheada de la BD
        );

        if (!passwordIsValid) {
            return res.status(401).json({ // 401 = No Autorizado
                accessToken: null,
                message: "Contraseña incorrecta."
            });
        }

        // 4. (RNF-05) ¡ÉXITO! Crear el Token (JWT)
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, // Los datos que guardamos en el token
            AUTH_SECRET,                              // La clave secreta para firmarlo
            { expiresIn: '24h' }                      // El token expira en 24 horas
        );

        // 5. Enviar el token al frontend
        res.status(200).json({
            id: usuario.id,
            email: usuario.email,
            accessToken: token // El frontend guardará esto
        });

    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({
            message: "Error interno al iniciar sesión."
        });
    }
};