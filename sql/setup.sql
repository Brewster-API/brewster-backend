DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS drinks CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink_name TEXT  NOT NULL,
    brew TEXT NOT NULL,
    drink_description TEXT NOT NULL,
    ingredients TEXT []
);

CREATE TABLE favorites (
    user_id BIGINT, 
    drink_id BIGINT, 
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (drink_id) REFERENCES drinks(id)
);
