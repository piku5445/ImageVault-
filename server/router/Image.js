
const express = require("express");

const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");
const upload = require("../middlewares/ImageUploadMiddleWare");

const {
  UploadImage,
  fetchImages,
  deleteImageController
} = require("../controller/ImageController");

const router = express.Router();

// Upload Image (Admin only)
router.post(
  "/upload",
  requireAuth,
  requireRole("admin"),
  upload.array("image", 10),
  UploadImage
);
// Get all images (Authenticated users)
router.get(
  "/get",
  requireAuth,
  fetchImages
);

// Delete image (Admin only)
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  deleteImageController
);

module.exports = router;