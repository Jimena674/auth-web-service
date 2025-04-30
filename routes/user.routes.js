//Llamar las funciones del controlador de usuario

//Importar módulos
const express = require("express"); // Acceder a la librería de express para crear el servidor
const router = express.Router(); // Crear un enrutador de express
const db = require("../config/db"); // Importar la conexión a la base de datos
const bcrypt = require("bcrypt"); // Acceder a la librería de bcrypt para encriptar contraseñas

const User = require("../models/User"); // Importar el controlador de usuario

// Registro de usuario

/* 
router.post("/register", (req, res) => {
  const { email, password } = req.body; // Desarmar el cuerpo de la petición para obtener el correo y la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10); // Encriptar la contraseña con bcrypt
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)"; // Consulta SQL para insertar un nuevo usuario

  db.query(sql, [email, hashedPassword], (err, result) => {
    // Ejecutar la consulta SQL
    if (err) {
      console.error("Error al registrar el usuario:", err); // Mostrar error en consola
      return res.status(500).json({ message: "Error al registrar el usuario" }); // Enviar respuesta de error al cliente
    }
    res.status(201).json({ message: "Usuario registrado con éxito" }); // Enviar respuesta de éxito al cliente
  });
});
*/
