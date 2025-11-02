// Cargar las variables de entorno
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');

// (Importaremos la conexión a BD más adelante)

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Permite peticiones de otros dominios (nuestro frontend)
app.use(express.json()); // Permite al servidor entender JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡API de Sazón Azteca funcionando!');
});

// (Aquí irán nuestras rutas de /api/platos, /api/reservas, etc.)

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});