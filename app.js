const cors = require("cors");
const logger = require("morgan");
const express = require("express");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST",
    credential: true,
    preflightContinue: true,
  }),
);

app.use((req, res, next) => {
  next();
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
