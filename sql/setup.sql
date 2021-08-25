DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS drinks CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT,
    email TEXT UNIQUE,
    password_hash TEXT
);

CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink_name TEXT  NOT NULL,
    brew TEXT NOT NULL,
    drink_description TEXT NOT NULL,
    ingredients TEXT [] NOT NULL,
    post_id BIGINT REFERENCES users(id)
);

CREATE TABLE favorites (
    user_id BIGINT,
    drink_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (drink_id) REFERENCES drinks(id)
);
