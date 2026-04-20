const express = require("express")
const router = express.Router();
const usersController = require("../controllers/users.controller")
const verifyToken = require('../middlewares/verifyToken')
//multer for image upload
const multer = require('multer');
const AppError = require("../utils/AppError");
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) { //cb takes error and destination
        console.log('filedest',file)
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        const fileName = `user-${Date.now()}.${ext}`
        cb(null, fileName)
    }
})
const fileFilter = (req, file, cb) => {
    console.log('filefilter',file)
    console.log("mimetype:", file.mimetype);
    const fileType = file.mimetype.split('/')[0]
    if (fileType === "image") {
        return cb(null, true)
    }else{
        const err = AppError.create('file must be image', 400)
        return cb(err, false)
    }
}
const upload = multer({
    storage: diskStorage,
    fileFilter:fileFilter //accept one type of files (image)
 })  //where i save uploaded images

//get all users (protected route)
router.route('/')
    .get(verifyToken, usersController.getAllUsers)
//register
router.route('/register')
    .post(upload.single('avatar'), usersController.register)
//login
router.route('/login')
    .post(usersController.login)

module.exports = router