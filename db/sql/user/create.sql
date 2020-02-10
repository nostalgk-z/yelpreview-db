CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
)