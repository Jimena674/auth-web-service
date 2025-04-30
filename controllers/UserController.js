// Gestión de req, res, errores y lógica

const bcrypt = require("bcryptjs"); // Acceder a la librería de bcrypt para encriptar contraseñas
const UserModel = require("../models/UserModel");

// Función de registro
const register = async function (req, res) {
  try {
    // Datos enviados como una solicitud
    const { email, password } = req.body;
    // Validar entrada de datos.
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    // Verificar si el usuario ya existe
    const existsUser = await UserModel.findUserByEmail(email);
    if (existsUser) {
      return res.status(409).json({ error: "El usuario ya existe." });
    }

    // Encripar la constraseña
    const salt = await bcrypt.genSalt(10); // String aleatorio
    const hashedPassword = await bcrypt.hash(password, salt); // Variable que va a reemplazar el password

    // Crear usuario
    await UserModel.createUser(email, hashedPassword);

    res.json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error("Error al registrar el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

module.exports = {
  register,
};
