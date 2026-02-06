import pool from "../config/db.js";

 const getDestinations = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM destinations ORDER BY rating DESC LIMIT 50"
  );
  console.log(rows);
  
  return rows;
};

export const getDestinationById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM destinations WHERE id = $1",
    [id]
  );
  return rows[0];
};

export default getDestinations;
