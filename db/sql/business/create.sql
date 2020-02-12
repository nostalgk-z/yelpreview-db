CREATE TABLE IF NOT EXISTS Business (
    business_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    state VARCHAR(2) NOT NULL,
    city TEXT NOT NULL
);