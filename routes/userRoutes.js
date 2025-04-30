//Importar módulos
const express = require("express"); // Acceder a la librería de express para crear el servidor
const router = express.Router(); // Crear un enrutador de express

//Llamar las funciones de usuario
const UserController = require("../models/UserController");

// Ruta de registro de usuario
router.post("/register", UserController.register);

module.exports = router;
