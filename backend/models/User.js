const mongoose = require('mongoose')
const UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["customer","shopkeeper","admin"],default:"customer",required:true},
    createdAt:{type:Date,default:Date.now}
})
const UserModel=mongoose.model("User",UserSchema)
module.exports=UserModel