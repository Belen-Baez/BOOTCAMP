require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/v1/turnos', (req, res) => {
    res.status(200).json({ 
      total: turnos.length,
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

    if (!turnoExiste) {
        return res.status(404).json({ error: 'Turno no encontrado' });
    }

      turnos = turnos.filter(t => t.id !== parseInt(id));
      res.status(200).json({ message: 'Turno eliminado correctamente',  data: turnos });
});

app.get('/api/v1/turnos/:especialidad', (req, res) => {
    const { especialidad } = req.params;
    const turnosFiltrados = turnos.filter(t => t.especialidad.toLowerCase() === especialidad.toLowerCase());

    if (turnosFiltrados.length === 0) {
        return res.status(404).json({ error: `No se encontraron turnos para la especialidad: ${especialidad}` }); }

    res.status(200).json({ total: turnosFiltrados.length, data: turnosFiltrados });
});

 app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
 });
