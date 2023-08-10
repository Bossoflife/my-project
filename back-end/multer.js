const multer = require("multer");

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { upload };

