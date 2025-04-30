// Gestión de req, res, errores y lógica

const bcrypt = require("bcrypt"); // Acceder a la librería de bcrypt para encriptar contraseñas
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
    const userExists = await UserModel.findUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ error: "El usuario ya existe." });
    }

    // Encripar la constraseña
    const salt = await bcrypt.genSalt(10); // String aleatorio
    const hashedPassword = await bcrypt.hash(password.toString(), salt); // Variable que va a reemplazar el password

    // Crear usuario
    await UserModel.createUser(email, hashedPassword);

    res.json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error("Error al registrar el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

//Función de Iniciar sesión
const login = async function (req, res) {
  try {
    // Datos enviados por el usuario
    const { email, password } = req.body;
    console.log("Email:", email);
    console.log("Contraseña:", password);

    // Validar la entrada de datos
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }
    // Buscar el usuario
    const searchUser = await UserModel.findUserByEmail(email);
    console.log("Usuario encontrado:", searchUser);
    if (!searchUser) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    // Comparar contraseña ingresada con la almacenada
    const validPassword = await bcrypt.compare(password, searchUser.password);
    console.log("Contraseña válida:", validPassword);
    if (!validPassword) {
      console.log("Contraseña inválida.");
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso." });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor.", error });
  }
};

module.exports = {
  register,
  login,
};
