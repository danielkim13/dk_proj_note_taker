const router = require("express").Router();
const path = require("path");
const fs = require("fs");

let db = require("../../db/db");

// function for creating new note.
function createNewNote(body, database) {
  // id based on what the next index of the array will be
  if (database.length === 0) {
    body.id = "0";
  } else {
    body.id = database.length.toString();
  }

  db.push(body);
  fs.writeFileSync(path.join(__dirname, "../../db/db.json"), JSON.stringify(database, null, 2));
  return body;
}

// function for deleting the note.
function deleteNote(id, database) {
  // filter through array and create array with missing id.
  database = database.filter((data) => data.id !== id);
  fs.writeFileSync(path.join(__dirname, "../../db/db.json"), JSON.stringify(database, null, 2));
  return database;
}

router.get("/notes", (req, res) => {
  res.json(db);
});

router.post("/notes", (req, res) => {
  const newNote = createNewNote(req.body, db);
  res.json(newNote);
});

router.delete("/notes/:id", (req, res) => {
  db = deleteNote(req.params.id, db);
  res.json(db);
});

module.exports = router;
