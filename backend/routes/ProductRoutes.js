const express=require('express')
let createProduct=require('../controllers/ProductControllers/createProduct')
let getProduct=require('../controllers/ProductControllers/getProduct')
let getProductByShop=require('../controllers/ProductControllers/getProductByShop')

const router=express.Router()

router.post("/",createProduct)
router.get("/",getProduct)
router.get("/:shopId",getProductByShop)

module.exports=router