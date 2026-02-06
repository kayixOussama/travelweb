CREATE TABLE IF NOT EXISTS package_features (
  id SERIAL PRIMARY KEY,
  package_id INT REFERENCES packages(id) ON DELETE CASCADE,
  feature TEXT NOT NULL
);
