const authService = {
  getUserWithUserName(db, username) {
    return db("users")
      .where({ username })
      .first();
  }
};

module.exports = authService;
