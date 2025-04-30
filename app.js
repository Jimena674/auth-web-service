// Importar módulos
const express = require("express"); // Acceder a la librería de express para crear el servidor
const dotenv = require("dotenv"); // Acceder a las variables del archivo env
const userRoutes = require("./routes/userRoutes"); // Importar las rutas de autenticación
require("./config/db"); // Importar la configuración de la base de datos

// Crear el servidor
const app = express(); // Crear una instancia de express
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use("/api", userRoutes); // Inicializador para usar las rutas de usuario en /api

// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Mensaje de confirmación al iniciar el servidor
});
