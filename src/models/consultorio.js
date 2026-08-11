const mongoose = require('mongoose');

const consultorioSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: [true, 'El número o piso/sala del consultorio es obligatorio'],
        unique: true
    },
    piso: {
        type: String
    },
    equipamiento: [String],
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Consultorio', consultorioSchema);