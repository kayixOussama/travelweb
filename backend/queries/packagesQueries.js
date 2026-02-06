import pool from "../config/db.js";

export const getPackages = async () => {
  const { rows } = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.duration,
      p.recommended,
      ARRAY_AGG(f.feature) AS features
    FROM packages p
    LEFT JOIN package_features f 
      ON p.id = f.package_id
    GROUP BY p.id
  `);

  return rows;
};
