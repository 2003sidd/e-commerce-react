
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      return cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })

  // const storage = new CloudinaryStorage({
  //   cloudinary: cloudinary,
  //   params: {
  //     folder: "uploads", // Cloudinary folder name
  //     format: async (req, file) => "png", // Adjust file format as needed
  //     public_id: (req, file) => file.originalname.split(".")[0], // File name
  //   },
  // });
  
  const upload = multer({ storage: storage })
  module.exports = {upload}