let ShopModel=require('../../models/Shop')
async function createShop(req,resp)
{
    // let {name,owner,address,gstin}=req.body\
    let name=req.body.name
    let owner = req.session.user.id
    let address=req.body.address
    let gstin=req.body.gstin
    let data=new ShopModel({name,owner,address,gstin})
    let res=await data.save()
    resp.send(res)
}
module.exports=createShop