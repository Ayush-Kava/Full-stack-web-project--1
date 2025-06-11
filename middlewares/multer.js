const multer = require('multer');
const path = require('path');
// 1) Tell Multer where to save files and how to name them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads')); 
  },
  filename: (req, file, cb) => {
    // e.g. image-163234234234.jpg
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, `prop-${unique}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
