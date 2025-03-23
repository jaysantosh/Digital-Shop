let Product = require('../../models/Product')
let Cart = require('../../models/Cart')
async function RemoveCart(req, resp)
{
    try{
        if(!req.session.user)
            resp.status(401).json({message:"Login Required"})

        const userId = req.session.user.id

        const productId = req.body.productId
        console.log(productId)
        const product = await Product.find({_id:productId})
        console.log("This is the product : " + product)
        let cart = await Cart.findOne({user:userId})
        console.log("The cart is this : " + cart)
        if(!cart)
            return resp.json({error_message:"The user does not have any cart"})
        console.log("this is the cart.cart "+ cart.cart)
        let existingItem = cart.cart.items.find((item)=>item.product.toString()=== productId)
        console.log("This is the existingItem "+ existingItem)
        if(existingItem)
        {
            let targetItem = cart.cart.items.find((item)=>item.product.toString()=== productId)

            cart.cart.items = cart.cart.items.filter((item)=>{item.product.toString()!==productId})
            cart.cart.totalQty -= targetItem.qty
            // cart.cart.totalPrice -= targetItem.qty * product.price
            console.log("This is the product price : "+ product.price)
            await cart.save()
            resp.json({success:true,message:"Product Removed from cart",cart:cart})
        }
        else{
            return resp.json({error_message:"The product doesn't exit in the cart"})
        }
    }
    catch(error)
    {
        console.error("Error in removing the cart:"+ error)
    }
}
module.exports=RemoveCart