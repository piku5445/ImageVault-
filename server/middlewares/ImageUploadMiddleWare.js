const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// File filter function
const checkFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('not an image file'), false);
  }
};

// Multer middleware
module.exports = multer({
  storage: storage,
  fileFilter: checkFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  }
});