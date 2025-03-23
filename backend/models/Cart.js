const mongoose = require("mongoose")

const CartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: {
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: { type: Number, default: 1 },
      },
    ],
    totalQty: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Cart", CartSchema)

