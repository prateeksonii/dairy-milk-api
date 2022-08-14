const express = require("express");
const morgan = require("morgan");
const router = require("./api/v1/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1", router);

// not found handler
app.all("*", (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
});

// error handler
app.use((err, req, res, next) => {
  if (res.status === 200) {
    res.status(500);
  }

  return res.json({
    ok: false,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV != "production" ? err.stack : undefined,
    },
  });
});

module.exports = app;
