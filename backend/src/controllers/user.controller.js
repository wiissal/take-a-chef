const { User, Customer, Chef } = require("../models");
const bcrypt = require("bcryptjs");

//  Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware

    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "role", "createdAt"],
      include: [
        {
          model: Customer,
          as: "customerProfile",
          attributes: ["id", "preferences"],
        },
        {
          model: Chef,
          as: "chefProfile",
          attributes: ["id", "bio", "specialty", "rating", "photo"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/change-password - Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId; // from auth middleware

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await user.update({ password: hashedPassword });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = exports;
