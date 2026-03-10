const express = require("express");
const router = express.Router();
const newsletterController = require("../controller/newsletterController");
const { verifyToken, isAdmin } = require("../middleware/validateToken");

// Admin routes (protected)

// Only admins can create, update, or delete newsletters
router.post(
  "/addEvents",
  verifyToken,
  isAdmin,
  newsletterController.createNewsletter,
);
router.put(
  "/updateEvents/:id",
  verifyToken,
  isAdmin,
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
