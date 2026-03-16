-- Rick & Morty App - SQLite Schema
-- Este archivo es solo referencia. El schema se crea automáticamente en database/database.ts

CREATE TABLE IF NOT EXISTS roles (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS document_types (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT    NOT NULL,
  abbreviation TEXT    NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  name             TEXT    NOT NULL,
  email            TEXT    NOT NULL UNIQUE,
  password_hash    TEXT    NOT NULL,
  role_id          INTEGER NOT NULL DEFAULT 2,
  document_type_id INTEGER,
  document_number  TEXT,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id)          REFERENCES roles(id),
  FOREIGN KEY (document_type_id) REFERENCES document_types(id)
);

CREATE TABLE IF NOT EXISTS favorites (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id      INTEGER NOT NULL,
  character_id INTEGER NOT NULL,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, character_id)
);

-- Seed data (insertado automáticamente en el primer arranque)
-- Roles:  1=admin, 2=user
-- Tipos de documento: CC, TI, CE, PP, NIT
-- Usuario admin por defecto: admin@example.com / Admin123
