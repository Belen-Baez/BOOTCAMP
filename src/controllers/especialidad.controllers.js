const Especialidad = require('../models/especialidad');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.find();
        return respuestaEstandar(res, 200, true, 'Especialidades obtenidas', especialidades);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener especialidades', error.message);
    }
};

const createEspecialidad = async (req, res) => {
    try {
        const nueva = await Especialidad.create(req.body);
        return respuestaEstandar(res, 201, true, 'Especialidad creada', nueva);
    } catch (error) {
        return respuestaEstandar(res, 400, false, 'Error al crear especialidad', error.message);
    }
};

module.exports = { getEspecialidades, createEspecialidad };