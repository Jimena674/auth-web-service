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
    const clearPassword = String(password).trim(); // Convertir a string y eliminar espacios
    const salt = await bcrypt.genSalt(10); // String aleatorio
    const hashedPassword = await bcrypt.hash(clearPassword, salt); // Variable que va a reemplazar el password

    // Crear usuario
    await UserModel.createUser(email, hashedPassword);

    res.json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error("Error al registrar el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

//Función de Iniciar sesión
const login = async (req, res) => {
  try {
    // Datos enviados por el usuario
    const { email, password } = req.body;
    console.log("Email enviado:", email);
    console.log("Contraseña enviada:", password);

    // Validar la entrada de datos
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    // Buscar el usuario
    const user = await UserModel.findUserByEmail(email);
    console.log("Usuario encontrado:", user);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    // Comparar contraseña ingresada con la almacenada
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Contraseña válida:", validPassword);
    if (!validPassword) {
      console.log("Contraseña incorrecta.");
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso." });
  } catch (error) {
    console.error("Error al iniciar sesión.", error);
    res.status(500).json({ message: "Error en el servidor.", error });
  }
};

// Función para actualizar un usuario con el id
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password } = req.body;

    const updateData = {};

    if (email) {
      updateData.email = email.trim();
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No hay datos para actualizar." });
    }

    await UserModel.updateUserById(userId, updateData);

    res.status(200).json({ message: "Usuario actualizado con éxito." });
  } catch (error) {
    console.error("Error al actualizar el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

// Función para eliminar un usuario con el id
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await UserModel.deleteUserById(userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

// Función para obtener los datos de un usuario por el id
const getUser = async (req, res) => {
  try {
    //Datos que ingresa el usuario
    const userId = req.params.id;
    // Buscar el usuario
    const user = await UserModel.findUserById(userId);
    // En caso de que no exista el usuario
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.json({ message: "Usuario encontrado, los datos son: ", user });
  } catch (error) {
    console.error("Error al buscar el usuario.", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
};
