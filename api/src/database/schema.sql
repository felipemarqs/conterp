CREATE DATABASE conterp;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE sondas (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    access_level VARCHAR NOT NULL CHECK (access_level IN ('user', 'adm')), 
    sonda_id UUID,
    FOREIGN KEY(sonda_id) REFERENCES sondas(id)
);

ALTER TABLE users ADD CONSTRAINT sonda_id FOREIGN KEY(sonda_id) REFERENCES sondas(id);

CREATE TABLE efficiency (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    sonda_id UUID,
    user_id UUID,
    hours_worked INTEGER,
    hours_standby INTEGER,
    dtm INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(sonda_id) REFERENCES sondas(id)
);