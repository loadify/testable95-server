require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");

const connectDB = require("./database/connection");

const index = require("./routes/index");
const testCodes = require("./routes/testCodes");

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST",
    credential: true,
    preflightContinue: true,
  }),
);

app.use("/", index);
app.use("/test-codes", testCodes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: res.locals.message });
});

module.exports = app;
