const AppError = require("../utils/AppError")
const http = require("../utils/httpStatusText")

module.exports=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
            return next(AppError.create('this role is not authorized', 401, http.ERROR))
        }
        next()
    }
}