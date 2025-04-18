const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload with storage settings
const upload = multer({
  storage: storage,
  // limits: { fileSize: 100 * 1024 * 1024 }, 
  // fileFilter: function (req, file, cb) {
  //   const filetypes = /jpeg|jpg|png|webp|mp4|mov|m4v|m4p|mpeg/;
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //   const mimetype = filetypes.test(file.mimetype);

  //   if (mimetype && extname) {
  //     return cb(null, true);
  //   } else {
  //     cb(new Error('Error'));
  //   }
  // }
});

module.exports = upload;
