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

inventoryRouter.get("/shopping/whalmart", jsonBodyParser, (req, res, next) => {
  inventoryService
    .getShoppingItems(req.app.get("db"))
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
    const { name, description, quantity, item_id } = req.body;
    let alreadyHas = [];
    console.log("itemid", item_id);
    console.log("name", name);

    let newId = await inventoryService.checkItemExists(req.app.get("db"), name);
    if (newId) {
      newId = newId.id;
    }
    console.log("newid", newId);
    let newItemId;

    if (item_id || newId) {
      alreadyHas = await inventoryService.checkUserAlreadyHas(
        req.app.get("db"),
        item_id || newId,
        userId
      );
    }
    console.log("alrewadyhas", alreadyHas);

    if (alreadyHas.length > 0) {
      console.log("addquantity", alreadyHas[0]);
      console.log("quanity", quantity);
      await inventoryService.addQuantity(
        req.app.get("db"),
        item_id || newId,
        userId,
        quantity,
        alreadyHas[0]
      );
      return res.status(200).json({});
    } else {
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
    }
    if (newId == null || newItemId == null) {
      return res.status(400).json({
        message: `Something went wrong`
      });
    }
    if (newItemId) {
      res.status(201).json(newItemId[0]);
    }
  });

module.exports = inventoryRouter;
