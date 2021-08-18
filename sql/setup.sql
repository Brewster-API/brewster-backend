DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS shops CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS beans CASCADE; 

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    fav_id TEXT [] REFERENCES favorites(id)
);

CREATE TABLE favorites (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_favorites TEXT [],
    menu_id
);

CREATE TABLE menus (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_name TEXT NOT NULL,
    description TEXT,
    shop_id TEXT NOT NULL REFERENCES shops(id)
);

CREATE TABLE favorites_menus (
    favorites_id BIGINT,
    menus_id BIGINT,
    FOREIGN KEY (favorites_id) REFERENCES favorites(id),
    FOREIGN KEY (menus_id) REFERENCES menus(id)
);

CREATE TABLE shops (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    menu_id TEXT NOT NULL [] REFERENCES menus(id)
);

CREATE TABLE recipes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ingridients TEXT []
);

CREATE TABLE beans (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    origin TEXT NOT NULL
)

CREATE TABLE beans_recipes (
    beans_id BIGINT,
    recipes_id BIGINT,
    FOREIGN KEY (beans_id) REFERENCES beans(id),
    FOREIGN KEY (recipes_id) REFERENCES recipes(id)
);



