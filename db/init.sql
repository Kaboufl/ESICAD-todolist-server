-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

USE DBtodo;

DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS categorie;

CREATE TABLE categorie (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(255) NOT NULL DEFAULT '',
  hex_color VARCHAR(255) NOT NULL DEFAULT '#0C3762'
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  id_categorie BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id) ON DELETE CASCADE
);