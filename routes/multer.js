var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    console.log('upload',req.body.maincategory + path.extname(file.originalname));
    //cb(null, req.body.maincategory + path.extname(file.originalname))
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

module.exports = upload;