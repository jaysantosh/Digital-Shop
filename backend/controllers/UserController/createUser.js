let UserModel=require("../../models/User")
async function createUser(req,resp)
{
    let {name,email,password,role}=req.body
    let data=new UserModel({
        name,
        email,
        password,
        role
    })
    let result=await data.save()
    resp.send(result)

}
module.exports=createUser