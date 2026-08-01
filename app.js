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
    res.status(200).json({ total: turnos.length,
    data: turnos 
   });
});

app.post('/api/v1/turnos', (req, res) => {
    const { paciente, dni, especialidad } = req.body;

      if (!paciente || !dni || !especialidad) {
         return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }
   const nuevoTurno = {
      id: turnos.length + 1,
      paciente,
      dni,
      especialidad
   };

   turnos.push(nuevoTurno);
   res.status(201).json({ message: 'Turno creado correctamente', data: nuevoTurno });
});

app.delete('/api/v1/turnos/:id', (req, res) => {
    const { id } = req.params;
    const turnoExiste = turnos.some(t=> t.id === parseInt(id)); 
    

    if (turnoExiste === -1) {
        return res.status(404).json({ error: 'Turno no encontrado' });
    }

    turnos.splice(turnoExiste, 1);
    res.status(200).json({ message: 'Turno eliminado correctamente' });
});

 app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
 });
