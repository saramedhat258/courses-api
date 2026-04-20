const User = require("../models/user.model")
const http = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')
const AppError = require('../utils/AppError')
const bcrypt = require("bcryptjs")
const generateJWT = require("../utils/generateJWT")

const getAllUsers = asyncWrapper(
    async (req, res, next) => {
        const query = req.query
        const limit = query.limit || 10
        const page = query.page || 1
        const skip = (page - 1) * limit
        const users = await User.find({}, { "__v": false, "password": false }).limit(limit).skip(skip)
        return res.json({ status: http.SUCCESS, message: "all users in db", data: users })
    })

const register = asyncWrapper(
    async (req, res, next) => {
        const { firstName, lastName, email, password, role } = req.body
        console.log(req.file)
        const isExist = await User.findOne({ email: email })
        if (isExist) {
            const err = AppError.create('this user is exist', 400)
            return next(err)
        }
        //pass hashing 
        const hashedPass = await bcrypt.hash(password, 10)
        console.log(req.file)
        const NewUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPass,
            role,
            avatar:req.file.filename
        })

        //generate jwt token
        /* to generate secret key write this in terminal:
        node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
        */
        const token = await generateJWT({ email: NewUser.email, id: NewUser._id, role: NewUser.role });
        NewUser.token = token;
        await NewUser.save();
        res.status(201).json({ status: http.SUCCESS, message: "user created successfully", data: { NewUser } })
    })


const login = asyncWrapper(
    async (req, res, next) => {
        const { email, password } = req.body
        if (!email && !password) {
            const err = AppError.create('email and password is required', 400)
            return next(err)
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            const err = AppError.create('user not found', 404, http.FAIL)
            return next(err)
        }
        //compare hashed pass with pass
        const matchedPass = await bcrypt.compare(password, user.password)
        if (user && matchedPass) {
            //generate token
            const token = await generateJWT({ email: user.email, id: user._id, role: user.role });
            return res.json({ status: http.SUCCESS, message: "user logged in succsessfully", data: { token } })
        } else {
            const err = AppError.create('something wrong', 500, http.ERROR)
            return next(err)
        }
    })

module.exports = {
    getAllUsers,
    register,
    login
}