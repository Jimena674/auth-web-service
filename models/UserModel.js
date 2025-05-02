// Interacción con la base de datos

const db = require("../config/db"); // Importar la conexión a la base de datos

// Buscar un usuario por el email para el registro
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

// Actualizar el usuario en la bd
const updateUserById = async (id, updateData) => {
  const fields = [];
  const values = [];

  for (let key in updateData) {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  }

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const [result] = await db.promise().query(sql, values);
  return result;
};

// Eliminar un usuario por id
const deleteUserById = async (id) => {
  const [result] = await db
    .promise()
    .query("DELETE FROM users WHERE id = ?", [id]);
  return result;
};

// Consultar un usuario por id

module.exports = {
  findUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
};
