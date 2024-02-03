const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const storeRouter = require("./routes/storeRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
//serving static files
app.use(express.static("./public"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mounting the router
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!! `, 404));
});

app.use(globalErrorHandler);

module.exports = app;
