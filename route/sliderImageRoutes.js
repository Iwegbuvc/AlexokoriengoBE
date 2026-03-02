const express = require("express");
const router = express.Router();
const sliderImageController = require("../controller/sliderImageController");
const upload = require("../middleware/sliderImageUpload");
const { verifyToken } = require("../middleware/validateToken");

// All routes protected for admin only
router.get("/getAll", sliderImageController.getSliderImages);
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  sliderImageController.uploadSliderImage,
);
router.delete("/:id", verifyToken, sliderImageController.deleteSliderImage);

module.exports = router;
