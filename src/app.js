require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const authRouter = require("./authRouter/authRouter");
const userRouter = require("./user/userRouter");
const skillsRouter = require("./skillsRouter/skillsRouter");
const inventoryRouter = require("./inventoryRouter/inventoryRouter");
const notesRouter = require("./notesRouter/notesRouter");

const app = express();

const morganSetting = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/skills/", skillsRouter);
app.use("/api/inventory/", inventoryRouter);
app.use("/api/notes/", notesRouter);

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.log(error);
    response = { error };
  }
  res.status(500).json(response);
});

module.exports = app;
