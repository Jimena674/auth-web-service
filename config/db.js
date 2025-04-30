// Importar módulos
const mysql = require("mysql2"); // Acceder a la librería de mysql2 para conectarse con MySQL
const dotenv = require("dotenv"); // Acceder a las variables del archivo env
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectarse a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos.");
});

module.exports = connection; // Exportar la conexión para usarla en otros archivos
