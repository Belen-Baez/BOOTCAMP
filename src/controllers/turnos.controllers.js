const Turno = require('../models/turnos');

const respuestaEstandar = ( res, status, success, message, data = null) => {
    return res.status(status).json({ 
        success, 
        timestamp: new Date().toISOString(),
        message, 
        total: Array.isArray(data) ? data.length : data ? 1 : 0,
        data 
    });
}

const getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find({ activo: true }).populate('paciente');
        return respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
    } catch (error) {
         return respuestaEstandar(res, 500, false, 'Error interno del servidor', error.message);
    }
};

const createTurno = async(req, res) => {
    try {
        const nuevoTurno = await Turno.create(req.body);
        return respuestaEstandar(res, 201, true, 'Turno creado correctamente', nuevoTurno);

    } catch (error) {

        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }

        return respuestaEstandar(res, 500, false, 'Error al crear el turno', error.message);
    }
};

const deleteTurno = (req, res) => {
    try {
        const { id } = req.params;
        const turnoExiste = turnos.some(t => t.id === parseInt(id));

        if (!turnoExiste) {
            return respuestaEstandar(res, 404, false, `Turno no encontrado con ID ${id}`);
        }

        turnos = turnos.filter(t => t.id !== parseInt(id));
        
        return respuestaEstandar(res, 200, true, 'Turno eliminado exitosamente', turnos);
    } catch (error) {
        console.error('Error al eliminar el turno:', error);
        return respuestaEstandar(res, 400, false, 'ID con formato invalido', error.message);
    }
};



module.exports = { getTurnos, createTurno, deleteTurno };