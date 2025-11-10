// controllers/reserva.controller.js

const db = require('../models');
const Reserva = db.Reserva; // Sequelize pluraliza 'reserva' a 'Reserva'

/**
 * 1. CREAR una nueva reserva
 * Ruta: POST /api/reservas
 */
exports.createReserva = async (req, res) => {
    
    // (Dev) ¡CORREGIDO!
    // Usamos los nombres de *tu* modelo: nombreCliente, numPersonas, etc.
    // Tu modelo espera 'fechaHora' (un solo campo), así que combinamos 'date' y 'time'.
    const { nombreCliente, email, telefono, date, time, numPersonas } = req.body;

    // (QA) Validación de Backend
    if (!nombreCliente || !email || !date || !time || !numPersonas) {
        return res.status(400).json({
            message: "Error de validación: Faltan campos obligatorios."
        });
    }

    try {
        // (Dev) Combinamos date y time en un solo objeto Date
        // que tu modelo 'fechaHora: DataTypes.DATE' espera.
        const fechaHoraISO = new Date(`${date}T${time}`);

        // (Dev) ¡CORREGIDO! Usamos los nombres de tu modelo
        const nuevaReserva = await Reserva.create({
            nombreCliente: nombreCliente,
            email: email,
            telefono: telefono,
            fechaHora: fechaHoraISO,
            numPersonas: parseInt(numPersonas, 10),
            estado: 'Confirmada' // (Dev) Asignamos un estado por defecto
        });

        // (PM/RF-09) Simulación de Email
        console.log(`(SIMULACIÓN) Email de confirmación enviado a: ${email}`);

        // (Frontend) ¡Éxito!
        res.status(201).json(nuevaReserva);

    } catch (error) {
        // (Dev) Error si la BD falla
        console.error("Error al crear la reserva:", error.message);
        res.status(500).json({
            message: "Error interno al procesar la reserva."
        });
    }
};