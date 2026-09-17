const Turno = require('../models/turnos');

const respuestaEstandar = (res, status, success, message, data = null) => {
    return res.status(status).json({ 
        success, 
        timestamp: new Date().toISOString(),
        message, 
        total: Array.isArray(data) ? data.length : data ? 1 : 0,
        data 
    });
};

const getTurnos = async (req, res) => {
    try {
        const { id } = req.query;
    
        if (id) {
            const turno = await Turno.findById(id).populate('paciente');
            if (!turno) {
                return respuestaEstandar(res, 404, false, 'Turno no encontrado');
            }
            return respuestaEstandar(res, 200, true, 'Turno obtenido exitosamente', turno);
        }
            
        const turnos = await Turno.find({ activo: true }).populate('paciente');
        
        return respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error interno del servidor', error.message);
    }
};

const createTurno = async (req, res) => {
    try {
        const origenPeticion = req.headers['x-origen'];
        const tokenHeader = req.headers['authorization'];

        console.log("📍 Petición realizada desde:", origenPeticion);

        const tokenSeguridad = tokenHeader ? tokenHeader.replace('Bearer ', '').trim() : '';

        if (!tokenSeguridad) {
            return respuestaEstandar(res, 401, false, 'no tiene permisos');
        }

        const esUrgente = req.query.urgencia === 'true';

        const datosDelTurno = {
            paciente: req.body.paciente,
            especialidad: req.body.especialidad,
            fechaTurno: req.body.fechaTurno,
            estado: req.body.estado || 'pendiente',
            observaciones: req.body.observaciones || ''
        };

        if (esUrgente) {
            datosDelTurno.estado = 'atendido';
            datosDelTurno.observaciones = 'ingreso por guardia medica';
            console.log("🚨 ALERTA: registrado un turno de urgencia");
        }

        const nuevoTurno = await Turno.create(datosDelTurno);
        const turnoPoblado = await Turno.findById(nuevoTurno._id).populate('paciente');

        return respuestaEstandar(res, 201, true, 'Turno creado exitosamente', turnoPoblado);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }

        return respuestaEstandar(res, 500, false, 'Error interno del servidor', error.message);
    }
};

const deleteTurno = async (req, res) => {
    try {
        const { id } = req.params;

        const turnoBorrado = await Turno.findByIdAndUpdate(
            id, 
            { activo: false, estado: 'cancelado' },
            { new: true }
        );

        if (!turnoBorrado) {
            return respuestaEstandar(res, 404, false, `Turno no encontrado con ID ${id}`);
        }
        
        return respuestaEstandar(res, 200, true, 'Turno eliminado exitosamente', turnoBorrado);
    } catch (error) {
        console.error('Error al eliminar el turno:', error);
        return respuestaEstandar(res, 400, false, 'ID con formato inválido', error.message);
    }
};

const marcarAtendido = async (req, res) => {
    try {
        const { id } = req.params;

        const turnoActualizado = await Turno.findByIdAndUpdate(
            id,
            { estado: 'atendido' },
            { new: true }
        );

        if (!turnoActualizado) return respuestaEstandar(res, 404, false, 'Turno no encontrado', id);
        return respuestaEstandar(res, 200, true, 'Turno actualizado', turnoActualizado);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error de servidor', error.message);
    }
};

module.exports = { getTurnos, createTurno, deleteTurno, marcarAtendido };