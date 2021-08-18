DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS shops CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    fav_id TEXT [] REFERENCES favorites(id)
);

CREATE TABLE shops (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    menu_id TEXT NOT NULL [] REFERENCES menus(id)
)




