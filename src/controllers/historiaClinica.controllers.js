const HistoriaClinica = require('../models/historiaClinica');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getHistoriasPorPaciente = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const historias = await HistoriaClinica.find({ paciente: pacienteId })
            .populate('medico')
            .populate('paciente');
        return respuestaEstandar(res, 200, true, 'Historia clínica del paciente', historias);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al consultar historia clínica', error.message);
    }
};

const createHistoriaClinica = async (req, res) => {
    try {
        const nuevaHistoria = await HistoriaClinica.create(req.body);
        return respuestaEstandar(res, 201, true, 'Registro médico añadido', nuevaHistoria);
    } catch (error) {
        return respuestaEstandar(res, 400, false, 'Error al guardar entrada', error.message);
    }
};

module.exports = { getHistoriasPorPaciente, createHistoriaClinica };