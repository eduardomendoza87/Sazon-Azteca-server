
const db = require('../models');
const Plato = db.Plato;
const Categoria = db.Categoria;

/**
 * 1. OBTENER TODOS los platillos (para la página de Menú)
 * Ruta: GET /api/platillos
 */
exports.findAllPlatos = async (req, res) => {
    
    try {
        // (DEV) Busca todos los registros en la tabla 'Platos'
        // Esta consulta fue la que finalmente funcionó y devolvió [].
        const platos = await Plato.findAll(); 

        res.status(200).json(platos);

    } catch (error) {
        // (Dev) Registramos el error real en la consola del servidor
        console.error("Error al buscar platillos:", error.message);
        
        // (Frontend) Enviamos una respuesta de error genérica al frontend
        res.status(500).json({ 
            message: "Error interno al obtener los platillos." 
        });
    }
};

/**
 * 2. OBTENER UN platillo por su ID (para la página de Historia)
 * Ruta: GET /api/platillos/:id
 */
exports.findOnePlato = async (req, res) => {
    
    // (DEV) Obtenemos el 'id' de los parámetros de la URL
    const id = req.params.id; 

    try {
        // (DEV) Usamos 'findByPk' (Find By Primary Key)
        // Es el método más rápido para buscar por ID.
        const plato = await Plato.findByPk(id);

        if (plato) {
            // (Frontend) ¡Éxito! Lo encontramos.
            // Enviamos el objeto JSON del platillo encontrado.
            res.status(200).json(plato);
        } else {
            // (Frontend) ¡No lo encontramos!
            // Enviamos un 404 (Not Found) claro.
            res.status(404).json({
                message: `No se pudo encontrar el platillo con id=${id}.`
            });
        }

    } catch (error) {
        // (Dev) Error genérico si la base de datos falla
        console.error(`Error al buscar platillo con id=${id}:`, error.message);
        res.status(500).json({
            message: "Error interno al buscar el platillo."
        });
    }
};

/**
 * 3. CREAR un nuevo platillo (Ruta Protegida)
 * Ruta: POST /api/platillos
 */
exports.createPlato = async (req, res) => {
    
    // (Dev) Recibimos todos los datos del formulario del Admin
    const { 
        titulo, 
        descripcion, 
        precio, 
        imagenUrl, 
        historia, 
        ingredientes, 
        procedencia, 
        categoriaId 
    } = req.body;

    // (QA) Validación de campos mínimos
    if (!titulo || !precio || !categoriaId) {
        return res.status(400).json({
            message: "Error: El título, precio y categoría son obligatorios."
        });
    }

    try {
        // (Dev) Creamos el nuevo platillo en la BD
        const nuevoPlato = await Plato.create({
            titulo,
            descripcion,
            precio,
            imagenUrl,
            historia,
            ingredientes,
            procedencia,
            categoriaId
        });

        // (Frontend) ¡Éxito!
        res.status(201).json(nuevoPlato); // 201 = Created

    } catch (error) {
        // (Dev) Error genérico (ej. el categoriaId no existe)
        console.error("Error al crear el platillo:", error.message);
        res.status(500).json({
            message: "Error interno al crear el platillo."
        });
    }
};

// --- (DEV) ¡NUEVA FUNCIÓN AÑADIDA! ---
/**
 * 4. ACTUALIZAR un platillo por ID (Ruta Protegida)
 * Ruta: PUT /api/platillos/:id
 */
exports.updatePlato = async (req, res) => {
    const id = req.params.id;

    try {
        // (Dev) 'update' devuelve un array, el primer valor [0] es el número de filas afectadas.
        const [numFilasAfectadas] = await Plato.update(
            req.body, // (Dev) Toma todos los campos del formulario y los actualiza
            { where: { id: id } } // Qué fila actualizar
        );

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Platillo actualizado con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo actualizar el platillo con id=${id}. (No encontrado)` });
        }
    } catch (error) {
        console.error("Error al actualizar el platillo:", error.message);
        res.status(500).json({ message: "Error interno al actualizar el platillo." });
    }
};

// --- (DEV) ¡NUEVA FUNCIÓN AÑADIDA! ---
/**
 * 5. ELIMINAR un platillo por ID (Ruta Protegida)
 * Ruta: DELETE /api/platillos/:id
 */
exports.deletePlato = async (req, res) => {
    const id = req.params.id;

    try {
        const numFilasAfectadas = await Plato.destroy({
            where: { id: id }
        });

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Platillo eliminado con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo eliminar el platillo con id=${id}. (No encontrado)` });
        }
    } catch (error) {
        console.error("Error al eliminar el platillo:", error.message);
        res.status(500).json({ message: "Error interno al eliminar el platillo." });
    }
};