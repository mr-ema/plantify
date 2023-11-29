import server from "bunrest";

import * as db from "./db/database.ts";

const app = server();
db.init();

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");

  next?.();
});

app.get('/api/v1/plants', (req, res) => {
  const plants = db.getAll();

  res.status(200).json(plants);
});

app.get('/api/v1/plants/:id', (req, res) => {
  const plant = db.getPlantById(req.params?.id);

  res.status(200).json(plant);
});

app.get('/api/v1/plants/search', (req, res) => {
  const plant = db.getPlantById(req.params?.id);

  res.status(200).json(plant);
});

app.listen(Bun.env?.PORT || 8000, () =>
  console.log(`Example server listening on port ${Bun.env?.PORT || 8000}!`),
);
