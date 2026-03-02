const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const upload = require("../middleware/projectImageUpload");
const { verifyToken } = require("../middleware/validateToken");

// All routes protected for admin only
router.get("/allProjects", projectController.getProjects);
router.post(
  "/addProject",
  verifyToken,
  upload.array("images", 4),
  projectController.addProject,
); // up to 4 images
router.put(
  "/editProject/:id",
  verifyToken,
  upload.array("images", 4),
  projectController.editProject,
);
router.delete(
  "/deleteProject/:id",
  verifyToken,
  projectController.deleteProject,
);

module.exports = router;
