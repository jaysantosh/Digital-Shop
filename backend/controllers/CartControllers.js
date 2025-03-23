const Cart = require("../models/Cart")
const Product = require("../models/Product")

exports.getCart = async (req, res) => {
  try {
    // For simplicity, we're assuming a single cart per user
    // In a real application, you'd use authentication to get the user's ID
    const cart = await Cart.findOne().populate("cart.items.product")
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    let cart = await Cart.findOne()
    if (!cart) {
      cart = new Cart()
    }

    const itemIndex = cart.cart.items.findIndex((item) => item.product.toString() === productId)
    if (itemIndex > -1) {
      cart.cart.items[itemIndex].qty += quantity
    } else {
      cart.cart.items.push({ product: productId, qty: quantity })
    }

    cart.cart.totalQty += quantity
    cart.cart.totalPrice += product.price * quantity

    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const cart = await Cart.findOne()
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const itemIndex = cart.cart.items.findIndex((item) => item.product.toString() === productId)
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    const product = await Product.findById(productId)
    const qtyDifference = quantity - cart.cart.items[itemIndex].qty

    cart.cart.items[itemIndex].qty = quantity
    cart.cart.totalQty += qtyDifference
    cart.cart.totalPrice += product.price * qtyDifference

    if (cart.cart.items[itemIndex].qty <= 0) {
      cart.cart.items.splice(itemIndex, 1)
    }

    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.removeFromCart = async (req, res) => {
  try {
    console.log("hello here in remove from")
    const { productId } = req.body
    const cart = await Cart.findOne()
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const itemIndex = cart.cart.items.findIndex((item) => item.product.toString() === productId)
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    const product = await Product.findById(productId)
    const item = cart.cart.items[itemIndex]

    cart.cart.totalQty -= item.qty
    cart.cart.totalPrice -= product.price * item.qty
    cart.cart.items.splice(itemIndex, 1)

    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

