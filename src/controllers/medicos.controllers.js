const Medico = require('../models/medicos'); // Ajustá la ruta según tu estructura

// GET: Obtener todos los médicos
const getMedicos = async (req, res) => {
  try {
    const medicos = await Medico.find().lean();
    return res.status(200).json({
      ok: true,
      data: medicos
    });
  } catch (error) {
    console.error("Error en getMedicos:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener la lista de médicos",
      error: error.message
    });
  }
};

// POST: Registrar un nuevo médico
const createMedico = async (req, res) => {
  try {
    const { nombre, matricula, dni, celular, horarios, dias } = req.body;

    // Validación de campos requeridos
    if (!nombre || !matricula || !dni || !horarios || !dias) {
      return res.status(400).json({
        ok: false,
        message: "Por favor completa todos los campos obligatorios."
      });
    }

    const nuevoMedico = new Medico({
      nombre,
      matricula,
      dni,
      celular,
      horarios,
      dias
    });

    await nuevoMedico.save();

    return res.status(201).json({
      ok: true,
      message: "Médico registrado con éxito",
      data: nuevoMedico
    });
  } catch (error) {
    console.error("Error en createMedico:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al registrar el médico",
      error: error.message
    });
  }
};

module.exports = {
  getMedicos,
  createMedico
};