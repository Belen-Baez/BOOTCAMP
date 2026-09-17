const { Schema, model } = require('mongoose');

const MedicoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre completo es obligatorio'],
    trim: true
  },
  matricula: {
    type: String,
    required: [true, 'La matrícula es obligatoria'],
    unique: true,
    trim: true
  },
  dni: {
    type: String,
    required: [true, 'El DNI es obligatorio'],
    trim: true
  },
  celular: {
    type: String,
    trim: true,
    default: 'No especificado'
  },
  dias: {
    type: String, 
    required: [true, 'Los días de atención son obligatorios']
  },
  horarios: {
    type: String, 
    required: [true, 'El horario de atención es obligatorio']
  }
}, {
  timestamps: true
});

module.exports = model('Medico', MedicoSchema);