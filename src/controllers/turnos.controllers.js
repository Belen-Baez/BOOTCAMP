let turnos = [
    { id: 1, paciente: 'Fermin Perez', dni: '12345678', especialidad: 'Cardiología' },
    { id: 2, paciente: 'Maria Lopez', dni: '87654321', especialidad: 'Dermatología' },
    { id: 3, paciente: 'Juan Martinez', dni: '11223344', especialidad: 'Pediatría' },
    { id: 4, paciente: 'Ana Torres', dni: '55667788', especialidad: 'Neurología' },
    { id: 5, paciente: 'Carlos Ramirez', dni: '99887766', especialidad: 'Ginecología' }
]

const respuestaEstandar = ( res, status, success, message, data = null) => {
    return res.status(status).json({ 
        success, 
        timestamp: new Date().toISOString(),
        message, 
        total: Array.isArray(data) ? data.length : data ? 1 : 0,
        data 
    });
}

const getTurnos = (req, res) => {
   respuestaEstandar(res, 200, true, 'Turnos obtenidos correctamente', turnos);
}

const createTurno = (req, res) => {
    const { paciente, dni, especialidad } = req.body;

      if (!paciente || !dni || !especialidad) {
         respuestaEstandar(res, 400, false, 'Faltan datos obligatorios');
      }

   const nuevoTurno = {
      id: turnos.length + 1,
      paciente,
      dni,
      especialidad
   };

   turnos.push(nuevoTurno);
   respuestaEstandar(res, 201, true, 'Turno creado correctamente', nuevoTurno);
}

const deleteTurno = (req, res) => {
    try {
        const { id } = req.params;
        const turnoExiste = turnos.some(t => t.id === parseInt(id));

        if (!turnoExiste) {
            return respuestaEstandar(res, 404, false, `Turno no encontrado con ID ${id}`);
        }

        turnos = turnos.filter(t => t.id !== parseInt(id));
        
        return respuestaEstandar(res, 200, true, 'Turno eliminado exitosamente', turnos);
    } catch (error) {
        console.error('Error al eliminar el turno:', error);
        return respuestaEstandar(res, 400, false, 'ID con formato invalido', error.message);
    }
};

module.exports = { getTurnos, createTurno, deleteTurno };