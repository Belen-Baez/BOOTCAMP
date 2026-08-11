const Medico = require('../models/medico');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getMedicos = async (req, res) => {
    try {
        const medicos = await Medico.find({ activo: true }).populate('especialidad');
        return respuestaEstandar(res, 200, true, 'Lista de médicos', medicos);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener médicos', error.message);
    }
};

const createMedico = async (req, res) => {
    try {
        const nuevoMedico = await Medico.create(req.body);
        return respuestaEstandar(res, 201, true, 'Médico creado con éxito', nuevoMedico);
    } catch (error) {
        return respuestaEstandar(res, 400, false, 'Error al crear médico', error.message);
    }
};

module.exports = { getMedicos, createMedico };