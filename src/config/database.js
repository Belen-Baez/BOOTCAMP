const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.error('🔴 Error al conectar a la base de datos 🔴:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('🟢 Conexión a la base de datos establecida 🟢');
});

mongoose.connection.on('disconnected', (err) => {
  console.error('🟡 Conexión a la base de datos perdida 🟡:', err.message);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔵 Conexión a la base de datos cerrada por terminación de la aplicación 🔵');
  process.exit(0);
});

module.exports = connectDB;