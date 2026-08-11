const express = require('express');
const router = express.Router();
const { getConsultorios, createConsultorio } = require('../controllers/consultorio.controllers');

router.get('/', getConsultorios);
router.post('/', createConsultorio);

module.exports = router;