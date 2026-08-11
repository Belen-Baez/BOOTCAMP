const mongoose = require('mongoose');

const especialidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la especialidad es obligatorio'],
        unique: true,
        uppercase: true
    },
    descripcion: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Especialidad', especialidadSchema);