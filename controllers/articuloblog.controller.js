// controllers/articuloblog.controller.js

const db = require('../models');
// Asumimos que el modelName en 'articuloblog.js' es 'ArticuloBlog'
const ArticuloBlog = db.ArticuloBlog; 

/**
 * 1. OBTENER TODOS los artículos (para la página de Relatos)
 * Ruta: GET /api/relatos
 */
exports.findAllRelatos = async (req, res) => {
    try {
        const articulos = await ArticuloBlog.findAll({
            attributes: [
                'id', 
                'slug', 
                'titulo', 
                'categoria', 
                'imagenDestacada', // <-- ¡LA CORRECCIÓN! (en lugar de 'imagen')
                'descripcion', 
                'autor'
            ]
        });
        res.status(200).json(articulos);

    } catch (error) {
        console.error("Error al buscar artículos:", error.message);
        res.status(500).json({
            message: "Error interno al obtener los artículos."
        });
    }
};

/**
 * 2. OBTENER UN artículo por su SLUG (para el detalle)
 * Ruta: GET /api/relatos/:slug
 */
exports.findOneBySlug = async (req, res) => {
    
    // (Frontend) ¡La clave! Lo buscamos por el 'slug' de la URL,
    // no por el 'id'. Esto es lo que 'StoryDetailPage.jsx' espera.
    const slug = req.params.slug;

    try {
        // (Dev) Usamos 'findOne' (Encontrar Uno) donde la
        // columna 'slug' coincida con el slug de la URL.
        const articulo = await ArticuloBlog.findOne({
            where: { slug: slug }
        });

        if (articulo) {
            // (Frontend) ¡Éxito! Lo encontramos.
            res.status(200).json(articulo);
        } else {
            // (Frontend) 404 si el slug no existe.
            res.status(404).json({
                message: `No se pudo encontrar el artículo con slug=${slug}.`
            });
        }

    } catch (error) {
        // (Dev) Error genérico si la base de datos falla
        console.error(`Error al buscar artículo con slug=${slug}:`, error.message);
        res.status(500).json({
            message: "Error interno al buscar el artículo."
        });
    }
};