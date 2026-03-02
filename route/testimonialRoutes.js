const express = require("express");
const router = express.Router();
const testimonialController = require("../controller/testimonialController");
const upload = require("../middleware/testimonialImageUpload");
const { verifyToken } = require("../middleware/validateToken");

// All routes protected for admin only
router.get("/getAllTesti", testimonialController.getTestimonials);
router.post(
  "/addTesti",
  verifyToken,
  upload.single("userImage"),
  testimonialController.addTestimonial,
);
router.put(
  "/edit/:id",
  verifyToken,
  upload.single("userImage"),
  testimonialController.editTestimonial,
);
router.delete(
  "/delete/:id",
  verifyToken,
  testimonialController.deleteTestimonial,
);

module.exports = router;
