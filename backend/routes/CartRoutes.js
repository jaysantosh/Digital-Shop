const express = require("express")
const router = express.Router()
const cartController = require("../controllers/CartControllers")
let GetCart = require('../controllers/CartController/GetCart')
let AddCart = require('../controllers/CartController/AddCart')
let RemoveCart = require('../controllers/CartController/RemoveCart')
router.get("/", GetCart)
router.post("/add", AddCart)
router.put("/update", AddCart)
router.delete("/remove", RemoveCart)

module.exports = router

