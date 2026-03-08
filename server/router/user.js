const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.get("/me", requireAuth, (req, res) => {
  const authUser = req.user;

  return res.json({
    user: authUser,
  });
});

module.exports = router;
