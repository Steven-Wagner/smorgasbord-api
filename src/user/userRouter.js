const express = require("express");
const userService = require("./userRouterService");

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter.get("/:userId", jsonBodyParser, (req, res, next) => {
  const { userId } = req.params;

  if (userId == null) {
    return res.status(400).json({
      message: `Id is required`
    });
  }

  userService
    .getUserInfo(req.app.get("db"), userId)
    .then(userInfo => {
      if (!userInfo) {
        return res.status(400).json({
          message: "User not included"
        });
      } else {
        res.send(userInfo);
      }
    })
    .catch(next);
});

userRouter.route("/edit/").post(jsonBodyParser, (req, res, next) => {
  const { userInfo } = req.body;

  userService
    .postNewInfo(req.app.get("db"), userInfo)
    .then(newInfo => {
      res.status(200).json(newInfo);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = userRouter;
