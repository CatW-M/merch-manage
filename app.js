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
const itemRouter = require("./routes/itemRoutes");
const inventoryRouter = require("./routes/inventoryRoutes");
const viewRouter = require("./routes/viewRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// SET Security HTTP Headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

// Further HELMET configuration for Security Policy (CSP)
const scriptSrcUrls = [
  "https://unpkg.com/",
  "https://tile.openstreetmap.org",
  "https://*.cloudflare.com/",
  "https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js",
];
const styleSrcUrls = [
  "https://unpkg.com/",
  "https://tile.openstreetmap.org",
  "https://fonts.googleapis.com/",
];
const connectSrcUrls = [
  "https://unpkg.com",
  "https://tile.openstreetmap.org",
  "https://*.cloudflare.com/",
  "https://bundle.js:*",
  "ws://localhost:*/",
];
const fontSrcUrls = ["fonts.googleapis.com", "fonts.gstatic.com"];

//set security http headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: ["'self'", "blob:", "data:", "https:"],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  }),
);
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
app.use(express.urlencoded({extended: true, limit: "10kb"}))

app.use(cookieParser());
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
  // console.log(req.cookies);
  next();
});

// 3) Routes

app.use("/", viewRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/inventories", inventoryRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!! `, 404));
});

app.use(globalErrorHandler);

module.exports = app;
