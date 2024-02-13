const path = require("path");
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
const projectRouter = require("./routes/projectRoutes");
const commentRouter = require("./routes/commentRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// SET Security HTTP Headers
app.use(helmet());

// Development Logging

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 1000,
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
    whitelist: ["businessUnit", "retailer", "city", "state", "zipCode"],
  }),
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers)
  next();
});

// 3) Routes

app.use("/", viewRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/comments", commentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!! `, 404));
});

app.use(globalErrorHandler);

module.exports = app;
