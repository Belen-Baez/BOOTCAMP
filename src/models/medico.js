const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del médico es obligatorio'],
        uppercase: true
    },
    matricula: {
        type: String,
        required: [true, 'La matrícula es obligatoria'],
        unique: true
    },
    especialidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Especialidad',
        required: [true, 'La especialidad es obligatoria']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Medico', medicoSchema);