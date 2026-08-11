const mongoose = require('mongoose');
const Turno = require('../models/turnos');
const Paciente = require('../models/paciente');
const respuestaEstandar = require('../utils/respuestaEstandar');

const registrarIngreso = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { datosPaciente, especialidad, fechaTurno, estado, observaciones } = req.body;

        const [nuevoPaciente] = await Paciente.create([datosPaciente], { session });

        const [nuevoTurno] = await Turno.create([{
            paciente: nuevoPaciente._id,
            especialidad,
            fechaTurno,
            estado: estado || 'pendiente',
            observaciones
        }], { session });

        await session.commitTransaction();
        session.endSession();

        const turnoCompleto = await Turno.findById(nuevoTurno._id).populate('paciente');

        return respuestaEstandar(res, 201, true, "Ingreso de paciente registrado correctamente", turnoCompleto);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }

        return respuestaEstandar(res, 500, false, "Transacción abortada", error.message);
    }
};

module.exports = { registrarIngreso };