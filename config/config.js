// Cargar las variables de entorno
require('dotenv').config();

module.exports = {
  // Configuración para el entorno de desarrollo
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql' // Le decimos que estamos usando MySQL
  },
  
  // (Aquí irían 'test' y 'production' para el despliegue)
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
};