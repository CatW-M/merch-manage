const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.setProjectUserIds, commentController.createComment);

router
  .route("/:id")
  .get(commentController.getComment)
  .delete(commentController.deleteComment)
  .patch(commentController.updateComment);

module.exports = router;
