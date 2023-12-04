import server from "bunrest";

import * as db from "./db/database.ts";

// TODO: Split endpoints in separated files, ex. users.ts, plants.ts
// TODO: Add security and data integrity validations
// TODO: Correct messages and code status

const app = server();
db.init();

const CORS_HEADERS = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, PUT",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    res.headers(CORS_HEADERS);
    res.status(200).send("OPTIONS /");
  }

  next?.();
});

app.get("/api/v1/plants", (req, res) => {
  const plants = db.getAll();

  res.status(200).json(plants);
});

app.get("/api/v1/plants/search", (req, res) => {
  const query = req.query?.query;

  if (!query) {
    return res.status(400).json({ error: "Bad request" });
  }

  const plant = db.searchPlant(query);
  res.status(200).json(plant);
});


app.get("/api/v1/plants/:id", (req, res) => {
  const plant = db.getPlantById(req.params?.id);

  res.status(200).json(plant);
});

app.post("/api/v1/users/:user_id/bookmarks", (req, res) => {
  const user_id = req.params?.user_id;
  let { entity_id, entity_type } = req.body as { entity_id: string, entity_type: string };

  if (!entity_type || !user_id || isNaN(user_id) || !entity_id || isNaN(entity_id)) {
    return res.status(400).json({ error: "Invalid user id or entity id or entity type" });
  }

  entity_type = db.cleanEntityType(entity_type);
  if (!db.isValidBookmarkEntityType(entity_type)) {
    return res.status(400).json({ error: "Invalid entity type" });
  }

  const bookmark = db.getBookmarkForUser(user_id, entity_id, entity_type);
  if (bookmark) {
    return res.status(409).json({ error: 'Bookmark already exists for this user and entity' });
  }

  const new_bookmark = db.addBookmarkForUser(user_id, entity_id, entity_type);
  res.status(201).json({ message: "Bookmark added successfully", bookmark: new_bookmark});
});

app.put("/api/v1/users/:user_id/bookmarks", (req, res) => {
  const user_id = req.params?.user_id;
  let { entity_type } = req.body as { entity_type: string };
  const { entity_id, is_bookmarked } = req.body as { entity_id: string, is_bookmarked: boolean };

  if (typeof is_bookmarked !== 'boolean') {
    return res.status(400).json({ error: "Invalid is_bookmarked type" });
  }

  if (!entity_type || !user_id || isNaN(user_id) || !entity_id || isNaN(entity_id)) {
    return res.status(400).json({ error: "Invalid user id or entity id or entity type" });
  }

  entity_type = db.cleanEntityType(entity_type);
  if (!db.isValidBookmarkEntityType(entity_type)) {
    return res.status(400).json({ error: "Invalid entity type" });
  }

  let bookmark = db.getBookmarkForUser(user_id, entity_id, entity_type)
  if (!bookmark) {
    return res.status(404).json({ error: 'Bookmark not found' });
  }

  const updated = db.toggleBookmarkForUser(user_id, entity_id, entity_type, is_bookmarked ? 1 : 0);
  if (!updated) {
    return res.status(400).json({ error: 'Failed to update bookmark' });
  }

  bookmark.is_bookmarked = is_bookmarked ? 1 : 0;
  res.status(200).json({ message: 'Bookmark updated successfully', bookmark: bookmark });
});

app.get("/api/v1/users/:user_id/bookmarks/:entity_type", (req, res) => {
  const user_id = req.params?.user_id;
  let entity_type = req.params?.entity_type;

  if (!entity_type || !user_id || isNaN(user_id)) {
    return res.status(400).json({ error: "Invalid user id or entity type" });
  }

  entity_type = db.cleanEntityType(entity_type);
  if (!db.isValidBookmarkEntityType(entity_type)) {
    return res.status(400).json({ error: "Invalid entity type" });
  }

  const bookmarkedPlants = db.getAllBookmarkedPlantsForUser(user_id);

  res.status(200).json(bookmarkedPlants);
});

app.get('/api/v1/users/:user_id/bookmarks/:entity_type/:entity_id', (req, res) => {
  const user_id = req.params?.user_id;
  const entity_id = req.params?.entity_id;
  let entity_type = req.params?.entity_type;

  if (!entity_type || !user_id || isNaN(user_id) || !entity_id || isNaN(entity_id)) {
    return res.status(400).json({ error: "Invalid user id or plant id or entity type" });
  }

  entity_type = db.cleanEntityType(entity_type);
  if (!db.isValidBookmarkEntityType(entity_type)) {
    return res.status(400).json({ error: "Invalid entity type" });
  }

  const bookmark = db.getBookmarkForUser(user_id, entity_id, entity_type);
  if (!bookmark) {
    return res.status(404).json({ error: "Bookmarked Not Found" });
  }

  res.status(200).json({ bookmark: bookmark });
});

app.listen(Bun.env?.PORT || 8000, () =>
  console.log(`Example server listening on port ${Bun.env?.PORT || 8000}!`),
);
