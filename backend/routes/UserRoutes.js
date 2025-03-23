const express=require('express')
let createUser=require('../controllers/UserController/createUser')
const router=express.Router()

router.post("/",createUser)

module.exports=router