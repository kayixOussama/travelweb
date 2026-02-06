CREATE TABLE IF NOT EXISTS destinations (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  location VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
