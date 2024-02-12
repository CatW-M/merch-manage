const express = require("express");
const storeController = require("../controllers/storeController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(storeController.getAllStores)
  .post(
    authController.protect,
    authController.restrictTo("admin", "bum"),
    storeController.createStore,
  );

router
  .route("/:id")
  .get(storeController.getStore)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "bum"),
    storeController.updateStore,
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "bum"),
    storeController.deleteStore,
  );

module.exports = router;
