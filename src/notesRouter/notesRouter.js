const express = require("express");
const notesService = require("./notesRouterService");

const notesRouter = express.Router();
const jsonBodyParser = express.json();

notesRouter.get("/:userId", jsonBodyParser, (req, res, next) => {
  const { userId } = req.params;

  if (userId == null) {
    return res.status(400).json({
      message: `Id is required`
    });
  }

  notesService
    .getUsersNotes(req.app.get("db"), userId)
    .then(notes => {
      res.send(notes);
    })
    .catch(next);
});

notesRouter
  .route("/:noteId/:userId")
  .delete(jsonBodyParser, (req, res, next) => {
    const { noteId, userId } = req.params;

    notesService
      .deleteNote(req.app.get("db"), noteId, userId)
      .then(noteUpdate => {
        res.status(200).json(noteUpdate);
      })
      .catch(error => {
        next(error);
      });
  });

notesRouter
  .route("/:userId/")
  .post(jsonBodyParser, async function(req, res, next) {
    const { userId } = req.params;
    const { description } = req.body;

    if (!userId || !description) {
      return res.status(400).json({
        message: `userId and description are required`
      });
    }

    newId = await notesService.insertNewNote(
      req.app.get("db"),
      description,
      userId
    );
    if (newId == null) {
      return res.status(400).json({
        message: `Something went wrong`
      });
    }
    if (newId) {
      res.status(201).json(newId);
    }
  });

module.exports = notesRouter;
