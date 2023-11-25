import server from "bunrest";

import * as db from "./db/database.ts";
import { Plant } from "@models/plant.ts";

const app = server();
db.init();

app.get('/api/v1/plant', (req, res) => {
  const plants: [Plant | null] = db.fetchAll() as [Plant];

  res.status(200).json(plants);
});

app.get('/api/v1/plant/:id', (req, res) => {
  res.status(200).json({ message: req.params?.id });
});

app.listen(Bun.env.PORT as string, () =>
  console.log(`Example server listening on port ${Bun.env.PORT}!`),
);
