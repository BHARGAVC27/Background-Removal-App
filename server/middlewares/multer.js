import multer from "multer";

// Set up storage engine
const storage = multer.diskStorage({
    filename: function(re,file,callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

export default upload;