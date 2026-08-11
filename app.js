require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const app = express();

connectDB();

const auditMiddlewares = require('./src/middlewares/auditoria.middlewares');
const errorHandlerMiddlewares = require('./src/middlewares/errorHandler.middlewares');
const turnosRoutes = require('./src/routes/turnos.routes');
const pacientesRoutes = require('./src/routes/paciente.routes');
const recepcionRoutes = require('./src/routes/recepcion.routes');

app.use(express.json());
app.use(auditMiddlewares);

app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/pacientes', pacientesRoutes);
app.use('/api/v1/recepcion', recepcionRoutes);
app.use('/api/medicos', require('./src/routes/medico.routes'));
app.use('/api/historias-clinicas', require('./src/routes/historiaClinica.routes'));
app.use('/api/especialidades', require('./src/routes/especialidad.routes'));
app.use('/api/consultorios', require('./src/routes/consultorio.routes'));

app.use(errorHandlerMiddlewares);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`.......SERVIDOR MUNICIPAL ACTIVO........`);
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.ENTORNO || 'Local'} `);
    console.log(`===============================================`);
});