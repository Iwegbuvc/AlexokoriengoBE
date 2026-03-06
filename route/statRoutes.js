const express = require("express");
const router = express.Router();
const statController = require("../controller/statController");
const { verifyToken } = require("../middleware/validateToken");

// Public route to get stats
router.get("/getStats", statController.getStats);

// Admin routes
router.post("/addStat", verifyToken, statController.createStat);
router.put("/updateStat/:id", verifyToken, statController.updateStat);
router.delete("/deleteStat/:id", verifyToken, statController.deleteStat);

module.exports = router;
