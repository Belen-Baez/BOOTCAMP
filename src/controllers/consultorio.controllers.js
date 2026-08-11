const Consultorio = require('../models/consultorio');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getConsultorios = async (req, res) => {
    try {
        const consultorios = await Consultorio.find({ activo: true });
        return respuestaEstandar(res, 200, true, 'Lista de consultorios', consultorios);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener consultorios', error.message);
    }
};

const createConsultorio = async (req, res) => {
    try {
        const nuevo = await Consultorio.create(req.body);
        return respuestaEstandar(res, 201, true, 'Consultorio registrado', nuevo);
    } catch (error) {
        return respuestaEstandar(res, 400, false, 'Error al registrar consultorio', error.message);
    }
};

module.exports = { getConsultorios, createConsultorio };