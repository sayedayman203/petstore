const { join } = require("path");

const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const createError = require("http-errors");

// helpers
const { responseFactory } = require("./helpers/responseFactory");

// routes
const routes = require("./routes");

const app = express();

//** config
if (process.env.NODE_ENV === "production") {
  // limit 360 request every minute for user
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 360,
    })
  );

  // security
  app.use(cors());
  app.use(helmet());

  // api log
  const accessLogStream = fs.createWriteStream(
    join(__dirname, "..", "logs", "access.log"),
    { flags: "a" }
  );
  app.use(
    "/api",
    logger("combined", {
      stream: accessLogStream,
    })
  );
} else if (process.env.NODE_ENV === "development") {
  // accept request from any domain
  app.use(
    cors({
      origin: "*",
    })
  );

  // log
  app.use(logger("dev"));
}

// parse request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//** handel api
app.use("/bid/", routes.bidRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // log error
  if (process.env.NODE_ENV === "production") {
    fs.appendFile(
      join(__dirname, "..", "logs", "error.log"),
      `${new Date().toISOString()}\n----\n${err}\n\n\n\n`,
      (f) => f
    );
  } else if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  // send error
  let code = err.status || 500;
  res
    .status(code)
    .json(responseFactory({ code, message: err.message || "SERVER_ERROR" }));
});

module.exports = app;
