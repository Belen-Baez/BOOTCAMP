const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('  VENTANILLA DE SALA MUNICIPAL ABIERTA');
 });
 
 app.get('/contacto', (req, res) => {
    res.send(`
        Datos de contacto:
          Teléfono: 3777-234566
          Email: contacto@empresa.com
          Dirección: Calle San Martín 123
          Web: www.empresa.com

    `);

});
 app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
 });
