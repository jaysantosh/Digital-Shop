let Shop = require('../../models/Shop')
async function deleteShop(req, resp)
{
    let  shopId = req.params.id;
    let result = await Shop.deleteOne({_id:shopId})

}
module.exports = deleteShop