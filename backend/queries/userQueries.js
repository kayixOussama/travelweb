import pool from "../config/db.js";

export const findUserByName = async (name) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE name = $1",
    [name]
  );
  return rows[0];
};

export const createUser = async ({ name, password, role }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (name, password, role)
     VALUES ($1, $2, $3)
     RETURNING id, name, role, created_at`,
    [name, password, role || "user"]
  );
  return rows[0];
};
