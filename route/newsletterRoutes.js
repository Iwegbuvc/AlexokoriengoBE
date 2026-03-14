const express = require("express");
const router = express.Router();
const newsletterController = require("../controller/newsletterController");
const { verifyToken, isAdmin } = require("../middleware/validateToken");
const newsletterImageUpload = require("../middleware/newsletterImageUpload");

// Admin routes (protected)

// Only admins can create, update, or delete newsletters
// Add image upload middleware for create and update
router.post(
  "/addEvents",
  verifyToken,
  isAdmin,
  newsletterImageUpload.single("image"),
  newsletterController.createNewsletter,
);
router.put(
  "/updateEvents/:id",
  verifyToken,
  isAdmin,
  newsletterImageUpload.single("image"),
  newsletterController.updateNewsletter,
);
router.delete(
  "/deleteEvents/:id",
  verifyToken,
  isAdmin,
  newsletterController.deleteNewsletter,
);
// Public route
router.get("/getEvents", newsletterController.getNewsletters);

module.exports = router;
