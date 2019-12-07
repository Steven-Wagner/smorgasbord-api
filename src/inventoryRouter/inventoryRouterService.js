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
        agent_id: userId,
        quantity: quantity,
        item_id: newId
      })
      .returning("id");
  }
};

module.exports = inventoryService;
