const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

// All routes require authentication
router.get("/profile", protect, userController.getProfile);
router.put("/change-password", protect, userController.changePassword);

module.exports = router;