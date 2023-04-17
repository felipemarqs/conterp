CREATE DATABASE conterp;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    access_level VARCHAR NOT NULL CHECK (accesslevel IN ('user', 'adm'))
);

CREATE TABLE bases (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR UNIQUE NOT NULL,
    user_id UUID,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE efficiency (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    base_id UUID,
    hours_worked INTEGER,
    hours_standby INTEGER,
    dtm INTEGER,
    FOREIGN KEY(base_id) REFERENCES bases(id)
);