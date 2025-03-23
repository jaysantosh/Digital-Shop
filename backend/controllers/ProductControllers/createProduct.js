let ProductModel=require('../../models/Product')
async function createProduct(req,resp)
{
    let {name,description,price,category,shop}=req.body
    let data=new ProductModel({
        name,
        description,
        price,
        category,
        shop
    })
    let result=await data.save()
    resp.send(result)
}
module.exports=createProduct