const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getBase);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/overview", authController.isLoggedIn, viewsController.getOverview);
router.get("/signup", authController.isLoggedIn, viewsController.getSignupForm);
router.get("/store/:slug", authController.isLoggedIn, viewsController.getStore);
router.get(
  "/project/:slug",
  authController.isLoggedIn,
  viewsController.getProject,
);
router.get("/account", authController.protect, viewsController.getAccount);
router.get(
  "/my-projects",
  authController.protect,
  viewsController.getMyProjects,
);
router.get(
  "/my-inventory",
  authController.protect,
  viewsController.getMyInventory,
);

// router.post("/store/update-store-data", viewsController.updateStoreData);
module.exports = router;
