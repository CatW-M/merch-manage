const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(inventoryController.getAllInventories)
  .post(inventoryController.createInventory);

router
  .route("/:id")
  .get(inventoryController.getInventory)
  .delete(inventoryController.deleteInventory)
  .patch(inventoryController.updateInventory);

module.exports = router;
