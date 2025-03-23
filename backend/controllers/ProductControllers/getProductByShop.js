let ProductModel=require('../../models/Product')
async function getProductsByShop(req,resp)
{
    let shopId=req.params.shopId
    let data=await ProductModel.find({shop:shopId})
    console.log(data)
    resp.send(data)
    
}
module.exports=getProductsByShop