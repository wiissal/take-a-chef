const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// All routes require authentication
router.get("/profile", authMiddleware, userController.getProfile);
router.put("/change-password", authMiddleware, userController.changePassword);

module.exports = router;
