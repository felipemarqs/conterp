CREATE DATABASE conterp;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE rigs (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    access_level VARCHAR NOT NULL CHECK (access_level IN ('user', 'adm')), 
    rig_id UUID,
    FOREIGN KEY(rig_id) REFERENCES rigs(id)
);


CREATE TABLE efficiencies (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    rig_id UUID,
    user_id UUID,
    gloss_detail_id UUID,
    available_hours NUMERIC,
    repair_hours NUMERIC,
    dtm_hours NUMERIC,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(rig_id) REFERENCES rigs(id),
    FOREIGN KEY (gloss_detail_id) REFERENCES gloss_details(id) 
);

CREATE TABLE gloss_details (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    description VARCHAR,
    classification VARCHAR NOT NULL,
    sub_category VARCHAR
);

INSERT INTO gloss_details (start_hour, end_hour, description, classification, sub_category)
VALUES ('12:00:00', '12:00:00', 'TESTE', 'TESTE', 'TESTE')
RETURNING *;


DROP TABLE efficiencies;

DROP TABLE gloss_details;
            