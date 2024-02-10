const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const storeRouter = require("./routes/storeRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARES
// SET Security HTTP Headers
app.use(helmet());

// Development Logging

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again in one hour!",
});

app.use("/api", limiter);

// Body Parser, Reading data from body into req.body

app.use(
  express.json({
    limit: "10kb",
  }),
);

// Data Sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["businessUnit", "retailer", "city", "state"],
  }),
);

// Serving static files
app.use(express.static("./public"));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers)
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
