require('dotenv').config();
const express = require('express');
const app = express();

const auditMiddlewares = require('./src/middlewares/audit.middlewares');
const errorHandlerMiddlewares = require('./src/middlewares/errorHandler.middlewares');
const turnosRoutes = require('./src/routes/turnos.routes');

app.use(express.json());
app.use(auditMiddlewares);
app.use('/api/v1/turnos', turnosRoutes);
app.use(errorHandlerMiddlewares);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`.......SERVIDOR MUNICIPAL ACTIVO........`);
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.ENTORNO || 'Local'} `);
    console.log(`===============================================`);
});