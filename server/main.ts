import server from "bunrest";

import * as db from "./db/database.ts";
import { Plant } from "@models/plant.ts";

const app = server();
db.init();

app.get('/api/v1/plants', (req, res) => {
  const plants: [Plant | null] = db.fetchAll() as [Plant];

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(plants);
});

app.get('/api/v1/plants/:id', (req, res) => {
  const plant = db.getPlantById(req.params?.id);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(plant);
});

app.listen(Bun.env.PORT as string, () =>
  console.log(`Example server listening on port ${Bun.env.PORT}!`),
);
