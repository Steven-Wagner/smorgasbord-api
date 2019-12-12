const userService = {
  getUserInfo(db, userId) {
    return db("users")
      .where("id", userId)
      .first();
  },
  postNewInfo(db, userInfo) {
    return db("users")
      .where("id", userInfo.userId)
      .update({
        intelligence: userInfo.intelligence,
        athleticism: userInfo.athleticism,
        lore: userInfo.lore,
        health: userInfo.health,
        insanity: userInfo.insanity,
        money: userInfo.money,
        investigation: userInfo.investigation
      });
  },
  insertNewUser(db, userInfo) {
    return db("users")
      .insert({
        username: userInfo.username,
        password: userInfo.password,
        athleticism: userInfo.athleticism,
        health: userInfo.health,
        insanity: userInfo.insanity,
        intelligence: userInfo.intelligence,
        investigation: userInfo.investigation,
        lore: userInfo.lore,
        money: userInfo.money
      })
      .returning("id");
  },
  insertNewSkills(db, newSkills) {
    return db("skills")
      .insert(newSkills)
      .returning("id");
  }
};

module.exports = userService;
