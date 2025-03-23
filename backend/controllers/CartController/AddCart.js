let Cart = require("../../models/Cart");
let Product = require("../../models/Product");

async function AddCart(req, resp) {
  try {
    if (!req.session.user) {
      return resp.status(401).json({ message: "Login required" });
    }

    const userId = req.session.user.id;

    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    
    if (!product) {
      return resp.status(404).json({ message: "Product not found" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        user: userId,
        cart: {
          items: [{ product: productId, qty: quantity }],
          totalQty: quantity,
          totalPrice: quantity * product.price,
        },
      });
    } else {
      // Check if product is already in cart
      const existingItem = cart.cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.qty += quantity;
      } else {
        cart.cart.items.push({ product: productId, qty: quantity });
      }

      // Update total quantity and total price
      cart.cart.totalQty += quantity;
      cart.cart.totalPrice += quantity * product.price;
    }

    await cart.save();
    resp.json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    resp.status(500).json({ message: "Error adding to cart" });
  }
}

module.exports = AddCart;
