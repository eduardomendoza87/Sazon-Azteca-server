const db = require('../models');
const ArticuloBlog = db.ArticuloBlog; 

/**
 * 1. OBTENER TODOS los artículos (PÚBLICO)
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
                'imagenDestacada', 
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
 * 2. OBTENER UN artículo por su SLUG (PÚBLICO)
 * Ruta: GET /api/relatos/:slug
 */
exports.findOneBySlug = async (req, res) => {
    
    const slug = req.params.slug;

    try {
        // (Frontend) Esto es para la página de detalle
        const articulo = await ArticuloBlog.findOne({
            where: { slug: slug }
        });

        if (articulo) {
            res.status(200).json(articulo);
        } else {
            res.status(404).json({
                message: `No se pudo encontrar el artículo con slug=${slug}.`
            });
        }

    } catch (error) {
        console.error(`Error al buscar artículo con slug=${slug}:`, error.message);
        res.status(500).json({
            message: "Error interno al buscar el artículo."
        });
    }
};

/**
 * 3. CREAR un nuevo Relato (Protegido por Admin)
 * Ruta: POST /api/relatos
 */
exports.create = async (req, res) => {
    const { 
        titulo, 
        slug, 
        autor, 
        categoria, 
        fecha, 
        imagenDestacada, 
        descripcion, 
        contenido 
    } = req.body;

    // (QA) Validación de campos mínimos
    if (!titulo || !slug || !contenido) {
        return res.status(400).json({
            message: "Error: Título, Slug y Contenido son obligatorios."
        });
    }

    try {
        const nuevoArticulo = await ArticuloBlog.create(req.body);
        res.status(201).json(nuevoArticulo);

    } catch (error) {
        // (Dev) Manejo de error si el 'slug' ya existe
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ // 409 = Conflicto
                message: "Error: El 'slug' (URL) ya existe. Prueba con uno diferente."
            });
        }
        console.error("Error al crear el relato:", error.message);
        res.status(500).json({ message: "Error interno al crear el relato." });
    }
};

/**
 * 4. ACTUALIZAR un Relato por SLUG (Protegido por Admin)
 * Ruta: PUT /api/relatos/:slug
 */
exports.update = async (req, res) => {
    const slug = req.params.slug;

    try {
        // (Dev) Actualizamos el artículo buscando por 'slug'
        const [numFilasAfectadas] = await ArticuloBlog.update(
            req.body, 
            { where: { slug: slug } } 
        );

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Relato actualizado con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo actualizar el relato con slug=${slug}. (No encontrado)` });
        }
    } catch (error) {
        console.error("Error al actualizar el relato:", error.message);
        res.status(500).json({ message: "Error interno al actualizar el relato." });
    }
};

/**
 * 5. ELIMINAR un Relato por SLUG (Protegido por Admin)
 * Ruta: DELETE /api/relatos/:slug
 */
exports.delete = async (req, res) => {
    const slug = req.params.slug;

    try {
        const numFilasAfectadas = await ArticuloBlog.destroy({
            where: { slug: slug }
        });

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Relato eliminado con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo eliminar el relato con slug=${slug}. (No encontrado)` });
        }
    } catch (error) {
        console.error("Error al eliminar el relato:", error.message);
        res.status(500).json({ message: "Error interno al eliminar el relato." });
    }
};