import pool from "../config/db.js";

export const createContactMessage = async ({ name, email, subject, message }) => {
  const { rows } = await pool.query(
    `INSERT INTO contact_messages (name, email, subject, message)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, subject, message]
  );
  return rows[0];
};

export const getAllContactMessages = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM contact_messages ORDER BY created_at DESC`
  );
  return rows;
};
