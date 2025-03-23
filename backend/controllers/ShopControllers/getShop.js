let ShopModel=require('../../models/Shop')
async function getShop(req,resp)
{
    let shops=await ShopModel.find().populate("owner","name")
    resp.send(shops)
}
module.exports=getShop