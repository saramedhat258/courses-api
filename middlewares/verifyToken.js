const jwt = require('jsonwebtoken');
const http = require("../utils/httpStatusText")
const AppError = require('../utils/AppError')
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if (!authHeader) {
        const err = AppError.create('token is required', 401, http.ERROR)
        return next(err)
    }
    const token = authHeader.split(" ")[1]
    try {
        //decode token and make sure user is logged in and token is valid
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        //make decoded token available to any middleware comes affter verfyToken middleware 
        req.currentUser=decodedToken
        next()
    } catch (error) {
        const err = AppError.create('invalid token', 401, http.ERROR)
        return next(err)
    }

}

module.exports = verifyToken