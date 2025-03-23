const mongoose=require('mongoose')

const ShopSchema=mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    address:{type:String,required:true},
    gstin:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
})
module.exports=mongoose.model("Shop",ShopSchema)