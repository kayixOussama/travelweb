import pool from "../config/db.js";

export const getAllPackages = async () => {
  const { rows } = await pool.query(`
    SELECT
      p.id,
      p.name,
      p.price,
      p.duration,
      p.recommended,
      COALESCE(ARRAY_AGG(f.feature) FILTER (WHERE f.feature IS NOT NULL), '{}') AS features
    FROM packages p
    LEFT JOIN package_features f
      ON p.id = f.package_id
    GROUP BY p.id
    ORDER BY p.id
  `);
  return rows;
};

export const getPackageById = async (id) => {
  const { rows } = await pool.query(`
    SELECT
      p.id,
      p.name,
      p.price,
      p.duration,
      p.recommended,
      COALESCE(ARRAY_AGG(f.feature) FILTER (WHERE f.feature IS NOT NULL), '{}') AS features
    FROM packages p
    LEFT JOIN package_features f
      ON p.id = f.package_id
    WHERE p.id = $1
    GROUP BY p.id
  `, [id]);
  return rows[0];
};

export const createPackage = async ({ name, price, duration, features, recommended }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `INSERT INTO packages (name, price, duration, recommended)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, price, duration, recommended || false]
    );
    const pkg = rows[0];

    if (features && features.length > 0) {
      for (const feature of features) {
        await client.query(
          "INSERT INTO package_features (package_id, feature) VALUES ($1, $2)",
          [pkg.id, feature]
        );
      }
    }

    await client.query("COMMIT");
    return { ...pkg, features: features || [] };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const updatePackage = async (id, { name, price, duration, features, recommended }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `UPDATE packages
       SET name = $1, price = $2, duration = $3, recommended = $4
       WHERE id = $5
       RETURNING *`,
      [name, price, duration, recommended || false, id]
    );
    const pkg = rows[0];

    if (!pkg) {
      await client.query("ROLLBACK");
      return null;
    }

    await client.query("DELETE FROM package_features WHERE package_id = $1", [id]);

    if (features && features.length > 0) {
      for (const feature of features) {
        await client.query(
          "INSERT INTO package_features (package_id, feature) VALUES ($1, $2)",
          [pkg.id, feature]
        );
      }
    }

    await client.query("COMMIT");
    return { ...pkg, features: features || [] };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const deletePackage = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM packages WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};
