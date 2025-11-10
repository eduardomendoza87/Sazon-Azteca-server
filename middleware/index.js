// middleware/index.js

const authJwt = require("./authJwt");

// Exportamos todos nuestros middlewares desde un solo lugar
module.exports = {
  authJwt
};