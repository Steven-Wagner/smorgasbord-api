const express = require("express");
const AuthService = require("./authRouterService");

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post("/login/", jsonBodyParser, (req, res, next) => {
  const { username, password } = req.query;
  const loginUser = { username, password };

  for (const [key, value] of Object.entries(loginUser)) {
    if (value == null) {
      return res.status(400).json({
        message: `Incorrect username or password`
      });
    }
  }
  AuthService.getUserWithUserName(req.app.get("db"), loginUser.username)
    .then(dbUser => {
      if (!dbUser) {
        return res.status(400).json({
          message: "Incorrect username or password"
        });
      }

      if (dbUser.password === loginUser.password) {
        res.send({ userId: dbUser.id });
      }
    })
    .catch(next);
});

module.exports = authRouter;
