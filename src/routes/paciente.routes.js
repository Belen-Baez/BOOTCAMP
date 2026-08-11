const express = require('express');
const router = express.Router();
const { getPacientes, createPaciente, deletePaciente} = require('../controllers/paciente.controllers');

router.get('/', getPacientes);
router.post('/', createPaciente);
router.delete('/:id', deletePaciente);  

module.exports = router;