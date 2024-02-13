const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");
const commentRouter = require("./commentRoutes");
const router = express.Router({ mergeParams: true });

// router.use(
//   authController.protect,
//   authController.restrictTo("bum", "admin", "manager"),
// );
router.use("/:projectId/comments", commentRouter);
router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(
    // authController.protect,
    // authController.restrictTo("admin", "bum"),
    projectController.deleteProject,
  );

module.exports = router;
