let ProductModel=require('../../models/Product')
async function getProduct(req,resp)
{
    let data=await ProductModel.find()
    resp.send(data)
}
module.exports=getProduct