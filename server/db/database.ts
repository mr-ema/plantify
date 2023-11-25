import { Database } from "bun:sqlite";

const db = new Database("plantify.sqlite", { create: true });

export function init() {
  db.run(`
    CREATE TABLE IF NOT EXISTS plant (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      imgUrl        VARCHAR NOT NULL,
      name          VARCHAR NOT NULL,
      description   TEXT NOT NULL
    );`
  );

  // Move it to a separated file for testing purposes in the future
  const isTableEmpty = fetchAll().length == 0;
  if (Bun.env.ENVIROMENT == "develoment" && isTableEmpty) {
    const { MOCK_PLANTS } = require("@mock-data/plant.ts");

    for (const plant of MOCK_PLANTS) {
      db.run(
        'INSERT INTO plant (imgUrl, name, description) VALUES (?, ?, ?)',
        [plant.imgUrl, plant.name, plant.description]
      );
    }
  }
}

export function fetchAll() {
  const query = db.query("SELECT * FROM plant");
  const plants = query.all();
  query.finalize();

  return plants;
}

export function getPlantById(id: string | number) {
  const query = db.query(`SELECT * FROM plant WHERE id = ${id};`);
  const plants = query.all();
  query.finalize();

  return plants[0];
}
