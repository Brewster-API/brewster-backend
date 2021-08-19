DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS drinks CASCADE;
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    fav_id TEXT [] REFERENCES favorites(id)
);
CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink_name TEXT NOT NULL,
    brew TEXT NOT NULL,
    temperature BOOL NOT NULL,
    drink_description TEXT NOT NULL,
    ingredients TEXT []
);
