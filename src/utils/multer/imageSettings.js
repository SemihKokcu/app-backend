const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(),"/public/images/"));
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, "-");
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = {
  fileFilter,
  fileStorage,
};
