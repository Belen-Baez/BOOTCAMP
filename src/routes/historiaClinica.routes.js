const express = require('express');
const router = express.Router();
const { getHistoriasPorPaciente, createHistoriaClinica } = require('../controllers/historiaClinica.controllers');

router.get('/paciente/:pacienteId', getHistoriasPorPaciente);
router.post('/', createHistoriaClinica);

module.exports = router;