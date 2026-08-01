const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let turnos = [
    { id: 1, paciente: 'Fermin Perez', dni: '12345678', especialidad: 'Cardiología' },
    { id: 2, paciente: 'Maria Lopez', dni: '87654321', especialidad: 'Dermatología' },
    { id: 3, paciente: 'Juan Martinez', dni: '11223344', especialidad: 'Pediatría' },
    { id: 4, paciente: 'Ana Torres', dni: '55667788', especialidad: 'Neurología' },
    { id: 5, paciente: 'Carlos Ramirez', dni: '99887766', especialidad: 'Ginecología' }
]

app.get('/api/v1/turnos', (req, res) => {
    res.json({ total: turnos.length,
    data: turnos 
   });
});

 app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
 });
