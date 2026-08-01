require('dotenv').config();
const express = require('express');
const app = express();

const auditMiddleware = require('./src/middlewares/audit.middlewares');
const errorHandlerMiddleware = require('./src/middlewares/errorHandler.middlewares');
const turnosRoutes = require('./src/routes/turnos.routes');

app.use(express.json());
app.use(auditMiddleware);
app.use('/api/v1/turnos', turnosRoutes);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
 });
