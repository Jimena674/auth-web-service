// Interacción con la base de datos

const db = require("../config/db"); // Importar la conexión a la base de datos

// Buscar un usuario por el email
const findUserByEmail = async (email) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// Crear usuario en la bd
const createUser = async (email, hashedPassword) => {
  await db
    .promise()
    .query("INSERT INTO users (email,password) VALUES (?,?)", [
      email,
      hashedPassword,
    ]);
};

module.exports = {
  findUserByEmail,
  createUser,
};
