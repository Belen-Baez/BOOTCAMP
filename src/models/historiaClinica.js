const mongoose = require('mongoose');

const historiaClinicaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El paciente es obligatorio']
    },
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico',
        required: [true, 'El médico es obligatorio']
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    diagnostico: {
        type: String,
        required: [true, 'El diagnóstico es obligatorio']
    },
    tratamiento: {
        type: String,
        required: [true, 'El tratamiento es obligatorio']
    },
    observaciones: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('HistoriaClinica', historiaClinicaSchema);