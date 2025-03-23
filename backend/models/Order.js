const mongoose=require('mongoose')

const OrderSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    items:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
            quantity:Number
        }
    ],
    totalAmount:Number,
    status:{type:String,enum:["Pending","Processing","Shipped","Delivered"],default:"Pending"},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Order",OrderSchema)