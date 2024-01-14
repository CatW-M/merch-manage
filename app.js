const express = require("express");
const morgan = require("morgan");

const storeRouter = require("./routes/storeRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
//serving static files
app.use(express.static("./after-section-08/public"));

app.use((req, res, next) => {
  console.log("Hello from the middleware 😄");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mounting the router
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/users", userRouter);

// 4) START SERVER
// const port = 3000;
// app.listen(port, () => {
//   console.log(`app running on port ${port}...`);
// });

module.exports = app;
