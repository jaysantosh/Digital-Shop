const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    shop:{type:mongoose.Schema.Types.ObjectId,ref:"Shop"},
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model("Product",ProductSchema)