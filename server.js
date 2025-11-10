// server.js

// --- 1. IMPORTACIONES ---
// El "cerebro" de nuestro servidor
const express = require('express'); 
// Para permitir que nuestro frontend (en otro puerto) hable con este servidor
const cors = require('cors'); 
// Para cargar nuestras variables secretas (contraseña de BD) desde .env
require('dotenv').config(); 
// Importamos la configuración de nuestra Base de Datos (que creaste con Sequelize)
const db = require('./models'); // Sequelize CLI crea un 'models/index.js' que es perfecto para esto

// --- 2. INICIALIZACIÓN ---
const app = express(); // Creamos nuestra aplicación de Express
const PORT = process.env.PORT || 8080; // Definimos el "teléfono" donde escuchará

// --- 3. MIDDLEWARE (El "Equipo de Seguridad y Traducción") ---
// ¿Qué es Middleware? Son funciones que se ejecutan ANTES de que la petición llegue a nuestra lógica.

// (Frontend) CORS: Es la "lista de invitados". Le dice al navegador
// "Oye, está bien si mi app de React en localhost:3000 quiere pedirme datos".
// Sin esto, el navegador bloqueará todas las peticiones por seguridad.
app.use(cors()); 

// (Frontend) JSON Parser: Es el "traductor". Cuando tu frontend envíe un
// formulario de reserva (un JSON), esto lo convierte en un objeto JavaScript
// que podemos usar fácilmente en 'req.body'.
app.use(express.json());

// --- 4. RUTA DE PRUEBA (Para saber que funciona) ---
// Le decimos a 'app' (nuestro servidor) que si alguien pide un GET a la raíz ('/')
// le responda con un JSON.
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de Sazón Azteca. V1.0' });

});

// --- 5. RUTAS DE LA APLICACIÓN ---
require("./routes/plato.routes")(app); // Rutas para manejar "platillos"
require("./routes/reserva.routes")(app); // Rutas para manejar "reservas"
require("./routes/articuloblog.routes.js")(app); // Rutas para manejar "relatos"
require("./routes/auth.routes")(app); // Rutas para manejar "autenticación" (registro/login)

// --- 5. SINCRONIZACIÓN Y ARRANQUE ---
// Aquí le decimos a Sequelize que "mire" nuestros modelos y, si es necesario,
// sincronice con la base de datos (¡ya lo hiciste con las migraciones,
// así que solo verificará la conexión!).
db.sequelize.sync()
    .then(() => {
        console.log("Base de datos conectada y sincronizada.");
        
        // (Frontend) Solo después de conectar la BD, arrancamos el servidor.
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}.`);
            console.log(`Accede en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Falló la conexión con la Base de Datos:", err.message);
    });