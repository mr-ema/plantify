import { Bookmark } from "@models/bookmark";
import { Plant } from "@models/plant";
import { Database } from "bun:sqlite";

// TODO: Split code in separated files by table
// TODO: Add security validations

const db = new Database("plantify.sqlite", { create: true });

export function init() {
  db.run(`
    CREATE TABLE IF NOT EXISTS plant (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url       VARCHAR NOT NULL,
      name          VARCHAR NOT NULL,
      description   TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         VARCHAR NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookmark (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id       INTEGER NOT NULL,
      entity_id     INTEGER NOT NULL,
      entity_type   TEXT NOT NULL,
      is_bookmarked INTEGER DEFAULT 1 NOT NULL,

      FOREIGN KEY(user_id) REFERENCES user(id)
    );
  `);

  // Move it to a separated file for testing purposes in the future
  if (Bun.env.ENVIROMENT == "develoment" && allTablesEmpty()) {
    const { MOCK_PLANTS } = require("@mock-data/plant.ts");
    const { MOCK_USERS } = require("@mock-data/users.ts");

    for (const plant of MOCK_PLANTS) {
      db.run(
        'INSERT INTO plant (img_url, name, description) VALUES (?, ?, ?)',
        [plant.img_url, plant.name, plant.description]
      );
    }

    for (const user of MOCK_USERS) {
      db.run(
        'INSERT INTO user (email) VALUES (?)',
        [user.email]
      );
    }
  }
}

export function allTablesEmpty(): boolean {
  const stmt = db.query(`
    SELECT
      (SELECT COUNT(*) FROM user) +
      (SELECT COUNT(*) FROM plant) as total
  `);
  const result = stmt.get() as { total: number };
  stmt.finalize();

  return (result.total == 0 ? true : false);
}

export function isValidBookmarkEntityType(entity_type: string): boolean {
  const valid_types = [ "plant"];

  return valid_types.includes(entity_type);
}

export function cleanEntityType(entity_type: string) {
  let cleaned = entity_type.toLowerCase().trim();

  if (cleaned.endsWith("s")) {
    cleaned = entity_type.slice(0, -1);
  }

  return cleaned;
}

export function getAll(): Plant[] | null[] {
  const stmt = db.query("SELECT * FROM plant");
  const result = stmt.all() as Plant[] | null[];
  stmt.finalize();

  return result;
}

export function getPlantById(id: string): Plant | null {
  const stmt = db.prepare("SELECT * FROM plant WHERE id = ?;");
  const result = stmt.get(id) as Plant | null;
  stmt.finalize();

  return result;
}

export function searchPlant(pattern: string): Plant[] | null[] {
  const stmt = db.query(`SELECT * FROM plant WHERE name LIKE '%${pattern}%';`);
  const result = stmt.all() as Plant[] | null[];
  stmt.finalize();

  return result;
}

export function addBookmarkForUser(user_id: string, entity_id: string, entity_type: string): Bookmark | null {
  const stmt = db.prepare(`
    INSERT INTO bookmark (user_id, entity_id, entity_type)
    VALUES (?, ?, ?);
  `);

  stmt.run(user_id, entity_id, entity_type);
  stmt.finalize();

  const result = getBookmarkForUser(user_id, entity_id, entity_type);
  return result;
}

export function removeBookmarkForUser(user_id: string, entity_id: number | string, entity_type: string): void {
  db.run('DELETE FROM bookmark WHERE user_id = ? AND entity_id = ? AND entity_type = ?;', [user_id, entity_id, entity_type]);
}

export function toggleBookmarkForUser(user_id: string, entity_id: string, entity_type: string, is_bookmarked: number): boolean {
  const stmt = db.prepare(`
    UPDATE bookmark
    SET is_bookmarked = ?
    WHERE
      user_id = ?
      AND entity_id = ?
      AND entity_type = ?;
  `);

  stmt.run(is_bookmarked, user_id, entity_id, entity_type);
  stmt.finalize();

  const bookmark = getBookmarkForUser(user_id, entity_id, entity_type);
  if (bookmark?.is_bookmarked == is_bookmarked) {
    return true;
  }

  return false;
}

export function getBookmarkForUser(user_id: string, entity_id: string, entity_type: string): Bookmark | null {
  const stmt = db.prepare(`
    SELECT *
    FROM bookmark
    WHERE
      user_id = ?
      AND entity_id = ?
      AND entity_type = ?;
  `);
  const result = stmt.get(user_id, entity_id, entity_type) as Bookmark | null;
  stmt.finalize();

  return result;
}

export function getAllBookmarkedPlantsForUser(user_id: string): Plant[] | null {
  const stmt = db.prepare(`
    SELECT plant.* FROM bookmark
    INNER JOIN plant ON plant.id = bookmark.entity_id
    WHERE bookmark.user_id = ? AND bookmark.is_bookmarked = 1;
  `);
  const result = stmt.all(user_id) as Plant[] | null;
  stmt.finalize();

  return result;
}

export function getBookmarkedPlantForUser(user_id: string, plant_id: string): Plant | null {
  const stmt = db.prepare(`
    SELECT plant.*
    FROM bookmark
    INNER JOIN plant ON plant.id = bookmark.entity_id
    WHERE bookmark.user_id = ? AND bookmark.entity_id = ?;
  `);
  const result = stmt.get(user_id, plant_id) as Plant | null;
  stmt.finalize();

  return result;
}
