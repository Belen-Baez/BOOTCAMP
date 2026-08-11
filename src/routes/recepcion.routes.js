const express = require('express');
const router = express.Router();
const { registrarIngreso } = require('../controllers/recepcion.controllers');

router.post('/', registrarIngreso);

module.exports = router;