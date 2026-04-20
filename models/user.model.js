const mongoose=require('mongoose');
const validator=require('validator');
const userRoles = require('../utils/roles');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    email:{
        type:String,
        unique:true, //not validator but helper
        required:true,
        validate:[validator.isEmail,'must be valid email address']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    role:{
        type:String, //["USER","ADMIN","MANAGER"]
        enum:[userRoles.USER,userRoles.ADMIN,userRoles.MANAGER],
        default:userRoles.USER
    },
    avatar:{
        type:String,
        default:'../uploads/default.jpg'
    }
})
module.exports=mongoose.model('User',userSchema)