const { Router } = require('express');
const { getMedicos, createMedico } = require('../controllers/medicos.controllers');

const router = Router();

router.get('/', getMedicos);
router.post('/', createMedico);

module.exports = router;