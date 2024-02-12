const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");
const commentRouter = require("./commentRoutes");
const router = express.Router({ mergeParams: true });

// router.param('id', commentController.checkID);

router.use("/:projectId/comments", commentRouter);
// router.route('/:projectId/comments').post(authController.protect, commentController.createComment)
router
  .route("/")
  .get(authController.protect, projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "bum"),
    projectController.deleteProject,
  );

module.exports = router;
