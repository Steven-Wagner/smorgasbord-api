const express = require("express");
const skillsService = require("./skillsRouterService");

const skillsRouter = express.Router();
const jsonBodyParser = express.json();

skillsRouter.get("/", jsonBodyParser, (req, res, next) => {
  skillsService
    .getAllSkills(req.app.get("db"))
    .then(skills => {
      if (!skills) {
        return res.status(400).json({
          message: "No Skills"
        });
      } else {
        res.send(skills);
      }
    })
    .catch(next);
});

skillsRouter.get("/:userId", jsonBodyParser, (req, res, next) => {
  const { userId } = req.params;

  if (userId == null) {
    return res.status(400).json({
      message: `Id is required`
    });
  }

  skillsService
    .getUsersSkills(req.app.get("db"), userId)
    .then(skills => {
      res.send(skills);
    })
    .catch(next);
});

skillsRouter
  .route("/:skillId/:level")
  .post(jsonBodyParser, (req, res, next) => {
    const { skillId, level } = req.params;

    skillsService
      .postUpdateSkill(req.app.get("db"), skillId, level)
      .then(skillUpdate => {
        res.status(200).json(skillUpdate);
      })
      .catch(error => {
        next(error);
      });
  });

module.exports = skillsRouter;
