const express=require('express')
let getShop=require("../controllers/ShopControllers/getShop")
let createShop=require('../controllers/ShopControllers/createShop')
let getShopById=require('../controllers/ShopControllers/getShopById')
const deleteShop = require('../controllers/ShopControllers/deleteShop')
const getShopByOwner = require('../controllers/ShopControllers/getShopByOwner')
const router=express.Router()

router.post("/",createShop)
router.get("/",getShop)
router.get("/:id",getShopById)
router.get("/owner/:id",getShopByOwner)
router.delete("/:id", deleteShop)
module.exports=router