let ShopModel=require('../../models/Shop')
async function getShopById(req,resp)
{
    // let {id}=req.params
    let shop = req.params.id
    let data=await ShopModel.find({_id:shop})
    console.log("this is the data: "+ data)
    resp.json(data)

}
module.exports=getShopById