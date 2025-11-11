const db = require('../models');
const Reserva = db.Reserva;
const { Op } = require('sequelize'); 

/**
 * 1. CREAR una nueva reserva (PÚBLICO)
 * Ruta: POST /api/reservas
 * 
 */
exports.create = async (req, res) => {
    
    // (Dev) Nombres de tu modelo 'reserva.js'
    const { nombreCliente, email, telefono, date, time, numPersonas } = req.body;

    // (QA) Validación de Backend
    if (!nombreCliente || !email || !date || !time || !numPersonas) {
        return res.status(400).json({
            message: "Error de validación: Faltan campos obligatorios."
        });
    }

    try {
        // (Dev) Combinamos date y time
        const fechaHoraISO = new Date(`${date}T${time}`);

        // (Dev) Creamos la reserva
        const nuevaReserva = await Reserva.create({
            nombreCliente: nombreCliente,
            email: email,
            telefono: telefono,
            fechaHora: fechaHoraISO,
            numPersonas: parseInt(numPersonas, 10),
            estado: 'Confirmada' // Estado por defecto
        });

        // (PM/RF-09) Simulación de Email
        console.log(`(SIMULACIÓN) Email de confirmación enviado a: ${email}`);

        // (Frontend) ¡Éxito!
        res.status(201).json(nuevaReserva);

    } catch (error) {
        console.error("Error al crear la reserva:", error.message);
        res.status(500).json({
            message: "Error interno al procesar la reserva."
        });
    }
};

// --- (DEV) ¡NUEVAS FUNCIONES DE ADMIN AÑADIDAS! ---

/**
 * 2. LEER TODAS las reservas (ADMIN - Protegido)
 * Ruta: GET /api/reservas
 * ¡Incluye lógica de filtrado basada en el diseño de Figma!
 */
exports.findAll = async (req, res) => {
    // (Dev) Leemos el filtro de la query string (ej. /api/reservas?filtro=hoy)
    const { filtro } = req.query;
    let whereClause = {}; // Por defecto, no hay filtro

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Inicio del día de hoy

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Inicio de mañana

    if (filtro === 'hoy') {
        // (Dev) Busca entre hoy y mañana
        whereClause.fechaHora = { [Op.between]: [today, tomorrow] };
    } else if (filtro === 'proximas') {
        // (Dev) Busca entre hoy y los próximos 7 días
        const next7Days = new Date(today);
        next7Days.setDate(next7Days.getDate() + 7);
        whereClause.fechaHora = { [Op.between]: [today, next7Days] };
    } else if (filtro === 'pasadas') {
        // (Dev) Busca todo lo anterior al inicio de hoy
        whereClause.fechaHora = { [Op.lt]: today };
    }
    // (Dev) Si el filtro es 'todas' o no se provee, whereClause se queda vacío ({})

    try {
        const reservas = await Reserva.findAll({
            where: whereClause,
            order: [['fechaHora', 'DESC']] // (UX) Ordenar por fecha (más nuevas primero)
        });
        res.status(200).json(reservas);
    } catch (error) {
        console.error("Error al buscar reservas:", error.message);
        res.status(500).json({ message: "Error interno al buscar reservas." });
    }
};

/**
 * 3. LEER UNA reserva por ID (ADMIN - Protegido)
 * Ruta: GET /api/reservas/:id
 */
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const reserva = await Reserva.findByPk(id);
        if (reserva) {
            res.status(200).json(reserva);
        } else {
            res.status(404).json({ message: `Reserva con id=${id} no encontrada.` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno al buscar la reserva." });
    }
};

/**
 * 4. ACTUALIZAR UNA reserva por ID (ADMIN - Protegido)
 * Ruta: PUT /api/reservas/:id
 * (Diseñado para la modal de "Actualizar Estado")
 */
exports.update = async (req, res) => {
    const id = req.params.id;
    // (Dev) Solo permitimos actualizar el 'estado'
    const { estado } = req.body; 

    if (!estado) {
        return res.status(400).json({ message: "El campo 'estado' es obligatorio." });
    }

    try {
        const [numFilasAfectadas] = await Reserva.update(
            { estado: estado }, // Solo actualiza el estado
            { where: { id: id } }
        );

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Reserva actualizada con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo actualizar la reserva con id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno al actualizar la reserva." });
    }
};

/**
 * 5. ELIMINAR UNA reserva por ID (ADMIN - Protegido)
 * Ruta: DELETE /api/reservas/:id
 */
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const numFilasAfectadas = await Reserva.destroy({
            where: { id: id }
        });

        if (numFilasAfectadas === 1) {
            res.status(200).json({ message: "Reserva eliminada con éxito." });
        } else {
            res.status(404).json({ message: `No se pudo eliminar la reserva con id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno al eliminar la reserva." });
    }
};