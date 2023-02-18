DROP TABLE IF EXISTS Comentario CASCADE;
CREATE TABLE IF NOT EXISTS Comentario (
    id serial PRIMARY KEY,
    texto text NOT NULL,
    data_pub date NOT NULL,
    id_user int NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Usuario(id)
)