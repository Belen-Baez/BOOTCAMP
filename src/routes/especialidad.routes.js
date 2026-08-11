const express = require('express');
const router = express.Router();
const { getEspecialidades, createEspecialidad } = require('../controllers/especialidad.controllers');

router.get('/', getEspecialidades);
router.post('/', createEspecialidad);

module.exports = router;