const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });

// router.param('id', projectController.checkID);

router
  .route("/")
  .get(authController.protect, commentController.getAllComments)
  .post(authController.protect, commentController.setProjectUserIds, commentController.createComment);

router
  .route("/:id")
  .get(commentController.getComment)
  .delete(commentController.deleteComment)
  .patch(commentController.updateComment);

module.exports = router;
