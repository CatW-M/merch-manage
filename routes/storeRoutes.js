const express = require("express");
const storeController = require("../controllers/storeController");
const authController = require("../controllers/authController");
const router = express.Router();

// router.param('id', storeController.checkID);

router
  .route("/")
  .get(authController.protect, storeController.getAllStores)
  .post(storeController.createStore);

router
  .route("/:id")
  .get(storeController.getStore)
  .patch(storeController.updateStore)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'bum'),
    storeController.deleteStore,
  );

module.exports = router;
