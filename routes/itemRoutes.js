const express = require("express");
const itemController = require("../controllers/itemController");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(itemController.getAllItems)
  .post(itemController.createItem);

router
  .route("/:id")
  .get(itemController.getItem)
  .delete(itemController.deleteItem)
  .patch(itemController.updateItem);

module.exports = router;
