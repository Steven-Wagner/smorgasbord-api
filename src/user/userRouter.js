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
  const userInfo = req.body;

  console.log("userInfo", userInfo);

  userService
    .postNewInfo(req.app.get("db"), userInfo)
    .then(newInfo => {
      res.status(200).json(newInfo);
    })
    .catch(error => {
      next(error);
    });
});

userRouter.route("/new/").post(jsonBodyParser, (req, res, next) => {
  const userInfo = req.body;

  console.log("userInfo", userInfo);

  userService
    .insertNewUser(req.app.get("db"), userInfo)
    .then(userId => {
      console.log("userId", userId[0]);
      const preppedSkills = userInfo.skills.map(skill => {
        return {
          agent_id: userId[0],
          level: Math.round(skill.score),
          skill_id: skill.id
        };
      });
      userService.insertNewSkills(req.app.get("db"), preppedSkills).then(() => {
        res.status(200).json(userId);
      });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = userRouter;
