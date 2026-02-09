import pool from "../config/db.js";

export const getAllDestinations = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM destinations ORDER BY rating DESC LIMIT 50"
  );
  return rows;
};

export const getDestinationById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM destinations WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const createDestination = async ({ title, location, image, rating, description }) => {
  const { rows } = await pool.query(
    `INSERT INTO destinations (title, location, image, rating, description)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, location, image, rating, description]
  );
  return rows[0];
};

export const updateDestination = async (id, { title, location, image, rating, description }) => {
  const { rows } = await pool.query(
    `UPDATE destinations
     SET title = $1, location = $2, image = $3, rating = $4, description = $5
     WHERE id = $6
     RETURNING *`,
    [title, location, image, rating, description, id]
  );
  return rows[0];
};

export const deleteDestination = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM destinations WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};
