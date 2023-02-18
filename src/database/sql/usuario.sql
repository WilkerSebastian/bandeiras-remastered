DROP TABLE IF EXISTS Usuario CASCADE;
CREATE TABLE IF NOT EXISTS Usuario (
    id serial PRIMARY KEY,
    imagem bytea NOT NULL,
    ativo boolean NOT NULL,
    nome varchar(120) NOT NULL,
    email varchar(120) NOT NULL,
    senha_hash varchar(60) NOT NULL
)