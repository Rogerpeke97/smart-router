-- DROP TABLE users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password text NOT NULL,
    date_joined TIMESTAMPTZ NOT NULL
)