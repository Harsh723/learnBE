import multer from "multer";

//we are using DiskStorage (https://github.com/expressjs/multer#readme)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../../public/temp")
    },
    filename: function (req, file, cb) { //our file will be stored in public/temp folder for sometime untill it get uploaded to cloudinary, so with what filename we want to keep in temp for that this function , we should create unique file name for each so that files dont get overidden by other same name file i.e keep a unique file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })