import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'database', 'app.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeSchema(db);
    seedData(db);
  }
  return db;
}

function initializeSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT    NOT NULL UNIQUE,
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
  `);
}

function seedData(database: Database.Database): void {
  const rolesCount = (
    database.prepare('SELECT COUNT(*) as count FROM roles').get() as { count: number }
  ).count;

  if (rolesCount === 0) {
    database
      .prepare('INSERT INTO roles (name, description) VALUES (?, ?)')
      .run('admin', 'Administrador del sistema');
    database
      .prepare('INSERT INTO roles (name, description) VALUES (?, ?)')
      .run('user', 'Usuario estándar');
  }

  const docTypesCount = (
    database.prepare('SELECT COUNT(*) as count FROM document_types').get() as { count: number }
  ).count;

  if (docTypesCount === 0) {
    const insert = database.prepare(
      'INSERT INTO document_types (name, abbreviation) VALUES (?, ?)'
    );
    insert.run('Cédula de Ciudadanía', 'CC');
    insert.run('Tarjeta de Identidad', 'TI');
    insert.run('Cédula de Extranjería', 'CE');
    insert.run('Pasaporte', 'PP');
    insert.run('NIT', 'NIT');
  }

  const usersCount = (
    database.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
  ).count;

  if (usersCount === 0) {
    const passwordHash = bcrypt.hashSync('Admin123', 10);
    database
      .prepare(
        'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)'
      )
      .run('Administrador', 'admin@example.com', passwordHash, 1);
  }
}

export default getDb;
