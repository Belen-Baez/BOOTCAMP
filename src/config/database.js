const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUri = process.env.DATABASE_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tu_base_de_datos';

    await mongoose.connect(dbUri);
  } catch (error) {
    console.error('🔴 Error al conectar a la base de datos 🔴:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('🟢 Conexión a la base de datos establecida 🟢');
});

mongoose.connection.on('disconnected', () => {
  console.error('🟡 Conexión a la base de datos perdida 🟡');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔵 Conexión a la base de datos cerrada por terminación de la aplicación 🔵');
  process.exit(0);
});

module.exports = connectDB;