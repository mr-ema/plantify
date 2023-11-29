import { Plant } from "@models/plant";
import { Database } from "bun:sqlite";

const db = new Database("plantify.sqlite", { create: true });

export function init() {
  db.run(`
    CREATE TABLE IF NOT EXISTS plant (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url       VARCHAR NOT NULL,
      name          VARCHAR NOT NULL,
      description   TEXT NOT NULL
    );
    `
  );

  // Move it to a separated file for testing purposes in the future
  const isTableEmpty = getAll().length == 0;
  if (Bun.env.ENVIROMENT == "develoment" && isTableEmpty) {
    const { MOCK_PLANTS } = require("@mock-data/plant.ts");

    for (const plant of MOCK_PLANTS) {
      db.run(
        'INSERT INTO plant (img_url, name, description) VALUES (?, ?, ?)',
        [plant.img_url, plant.name, plant.description]
      );
    }
  }
}

export function getAll(): Plant[] | null[] {
  const stmt = db.query("SELECT * FROM plant");
  const result = stmt.all() as Plant[] | null[];
  stmt.finalize();

  return result;
}

export function getPlantById(id: string | number): Plant | null {
  const stmt = db.prepare("SELECT * FROM plant WHERE id = ?;");
  const result = stmt.get(id) as Plant | null;
  stmt.finalize();

  return result;
}

export function searchPlan(pattern: string): Plant[] | null[] {
  const stmt = db.query(`SELECT * FROM plant WHERE name LIKE '%${pattern}%';`);
  const result = stmt.all() as Plant[] | null[];

  return result;
}
