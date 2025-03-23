let ShopModel=require('../../models/Shop')
async function getShopByOwner(req,resp)
{
    // let {id}=req.params
    let owner = req.params.id
    let data=await ShopModel.find({owner:owner})
    console.log("this is the data: "+ data)
    resp.json(data)

}
module.exports=getShopByOwner