const inventoryService = {
  getUsersItems(db, userId) {
    return db("items")
      .select(
        "items.quantity",
        "items.id",
        "items_description.name",
        "items_description.description"
      )
      .join("items_description", "items.item_id", "items_description.id")
      .where("items.agent_id", userId);
  },
  patchUpdateItem(db, itemId, quantity) {
    return db("items")
      .where("id", itemId)
      .update({
        quantity: quantity
      });
  },
  checkItemExists(db, name) {
    return db("items_description")
      .select("id")
      .where("name", name)
      .first();
  },
  insertNewItem(db, name, description) {
    return db("items_description")
      .insert({
        name: name,
        description: description,
        purchasable: false,
        cost: 0
      })
      .returning("id");
  },
  addNewItem(db, userId, quantity, newId) {
    return db("items")
      .insert({
        item_id: newId,
        agent_id: userId,
        quantity: quantity
      })
      .returning("id");
  },
  getShoppingItems(db) {
    return db("items_description").where("purchasable", true);
  },
  checkUserAlreadyHas(db, itemId, userId) {
    console.log("test", itemId);
    return db("items")
      .where("item_id", itemId)
      .where("agent_id", userId);
  },
  addQuantity(db, itemId, userId, quantity, alreadyHas) {
    console.log("test2", itemId);
    return db("items")
      .where("item_id", itemId)
      .where("agent_id", userId)
      .update({
        quantity: parseInt(quantity) + parseInt(alreadyHas.quantity)
      });
  }
};

module.exports = inventoryService;
