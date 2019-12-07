const express = require("express");
const inventoryService = require("./inventoryRouterService");

const inventoryRouter = express.Router();
const jsonBodyParser = express.json();

inventoryRouter.get("/:userId", jsonBodyParser, (req, res, next) => {
  const { userId } = req.params;

  if (userId == null) {
    return res.status(400).json({
      message: `Id is required`
    });
  }

  inventoryService
    .getUsersItems(req.app.get("db"), userId)
    .then(items => {
      res.send(items);
    })
    .catch(next);
});

inventoryRouter
  .route("/:itemId/:quantity")
  .patch(jsonBodyParser, (req, res, next) => {
    const { itemId, quantity } = req.params;

    inventoryService
      .patchUpdateItem(req.app.get("db"), itemId, quantity)
      .then(itemUpdate => {
        res.status(200).json(itemUpdate);
      })
      .catch(error => {
        next(error);
      });
  });

inventoryRouter
  .route("/:userId/")
  .post(jsonBodyParser, async function(req, res, next) {
    const { userId } = req.params;
    const { name, description, quantity } = req.body;

    let newId = await inventoryService.checkItemExists(req.app.get("db"), name);
    if (newId) {
      newId = newId.id;
    }
    let newItemId;

    if (!newId) {
      newId = await inventoryService.insertNewItem(
        req.app.get("db"),
        name,
        description
      );
    }
    if (newId > 0) {
      newItemId = await inventoryService.addNewItem(
        req.app.get("db"),
        userId,
        quantity,
        newId[0] || newId
      );
    }
    if (newId == null || newItemId == null) {
      return res.status(400).json({
        message: `Something went wrong`
      });
    }
    if (newItemId) {
      res.status(201).json(newItemId);
    }
  });

module.exports = inventoryRouter;
