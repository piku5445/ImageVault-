const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");
const { User } = require("../model/user");

const router = express.Router();

router.get(
  "/users",
  requireAuth,
  requireRole("admin"),
  async (_req, res) => {
    try {
      const users = await User.find(
        {},
        {
          email: 1,
          role: 1,
          isEmailVerified: 1,
          createdAt: 1,
        }
      ).sort({ createdAt: -1 });

      const result = users.map((u) => ({
        id: u._id.toString(),
        email: u.email,
        role: u.role,
        isEmailVerified: u.isEmailVerified,
        createdAt: u.createdAt,
      }));

      return res.json({ users: result });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

module.exports = router;
