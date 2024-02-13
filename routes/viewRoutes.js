const express = require("express");
const viewsController = require("./../controllers/viewsController");

const router = express.Router();

router.get("/", viewsController.getBase);

router.get("/login", viewsController.getLoginForm);

router.get("/overview", viewsController.getOverview);

router.get("/signup", viewsController.getSignupForm);

router.get("/store/:slug", viewsController.getStore);

module.exports = router;
