const express = require("express");
const viewsController = require("./../controllers/viewsController");

const router = express.Router();

router.get("/", viewsController.getBase);

router.get("/overview", viewsController.getOverview);

router.get("/store/:slug", viewsController.getStore);

module.exports = router;
