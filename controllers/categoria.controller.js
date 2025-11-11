// controllers/categoria.controller.js

const db = require('../models');
const Categoria = db.Categoria; // Asumiendo que el modelo se llama 'Categoria'

// --- 1. CREAR una nueva Categoria (RF-13) ---
// Ruta: POST /api/categorias
exports.create = async (req, res) => {
    // (Dev) El admin solo envía el nombre
    const { nombre } = req.body;

    // (QA) Validación
    if (!nombre) {
        return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });
    }

    try {
        const nuevaCategoria = await Categoria.create({ nombre });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error("Error al crear la categoría:", error.message);
        res.status(500).json({ message: "Error interno al crear la categoría." });
    }
};

// --- 2. LEER todas las Categorias (RF-13) ---
// Ruta: GET /api/categorias
exports.findAll = async (req, res) => {
    try {
        // (Dev) Buscamos todas las categorías
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error("Error al buscar categorías:", error.message);
        res.status(500).json({ message: "Error interno al buscar categorías." });
    }
};

// --- 3. LEER una Categoria por ID ---
// Ruta: GET /api/categorias/:id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await Categoria.findByPk(id);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ message: `Categoría con id=${id} no encontrada.` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno al buscar la categoría." });
    }
};

// --- 4. ACTUALIZAR una Categoria por ID (RF-13) ---
// Ruta: PUT /api/categorias/:id
exports.update = async (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });
    }

    try {
        // (Dev) 'update' devuelve un array, el primer valor [0] es el número de filas afectadas.
        const [numFilasAfectadas] = await Categoria.update(
            { nombre: nombre }, // Los nuevos datos
            { where: { id: id } } // Qué fila actualizar
        );

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Categoría actualizada con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo actualizar la categoría con id=${id}. (No encontrada o datos iguales)` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno al actualizar la categoría." });
    }
};

// --- 5. ELIMINAR una Categoria por ID (RF-13) ---
// Ruta: DELETE /api/categorias/:id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const numFilasAfectadas = await Categoria.destroy({
            where: { id: id }
        });

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Categoría eliminada con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo eliminar la categoría con id=${id}. (No encontrada)` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno al eliminar la categoría." });
    }
};