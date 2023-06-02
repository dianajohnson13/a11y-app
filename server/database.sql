CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- for uuid generation

CREATE DATABASE a11ychecker;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (user_name,user_email,user_password) VALUES ('John Doe', 'johndoe@email.com', 'supersecretpassword');

-- login to postgres db                 psql -U <username>
-- connect to a specific database       \c <db-name>
-- list tables                          \dt
