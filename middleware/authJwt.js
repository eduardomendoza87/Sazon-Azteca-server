// middleware/authJwt.js

const jwt = require('jsonwebtoken');
require('dotenv').config();
const AUTH_SECRET = process.env.AUTH_SECRET;

// 🔑 Esta es nuestra función "guardia"
const verifyToken = (req, res, next) => {
    
    // 1. 🕵️‍♂️ Revisar si el "pase de acceso" (token) viene en la petición.
    // El frontend deberá enviar el token en algo llamado "headers".
    // Usaremos 'x-access-token' como el nombre de ese header.
    let token = req.headers['x-access-token'];

    // 2. 🛑 Si no hay pase (token), rechazar el acceso.
    if (!token) {
        return res.status(403).json({ // 403 = Prohibido (Forbidden)
            message: "¡Acceso denegado! No se proveyó un token."
        });
    }

    // 3. ✅ Si hay un pase, verificar que sea real.
    // Usamos jwt.verify para comparar el token con nuestra clave secreta.
    jwt.verify(token, AUTH_SECRET, (err, decoded) => {
        
        // 4. 🛑 Si el pase es falso o expiró, rechazar el acceso.
        if (err) {
            return res.status(401).json({ // 401 = No Autorizado
                message: "¡No autorizado! El token es inválido o ha expirado."
            });
        }

        // 5. ✅ ¡El pase es real!
        // Guardamos los datos del usuario (que están en el token)
        // en el objeto 'req' para que el *siguiente* controlador
        // sepa QUIÉN está haciendo la petición.
        req.userId = decoded.id; // 'decoded' es el payload ( { id: 1, email: '...' } )
        
        // 6. ➡️ Llamamos a 'next()' para decir "¡Adelante!
        // Deja que la petición continúe hacia el controlador real".
        next();
    });
};

// Exportamos nuestro guardia para poder usarlo en otros archivos
const authJwt = {
    verifyToken: verifyToken
    // (Aquí podríamos añadir más guardias, ej: 'isAdmin', 'isModerator')
};

module.exports = authJwt;