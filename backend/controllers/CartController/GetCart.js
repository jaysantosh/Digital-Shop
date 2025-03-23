const Cart = require('../../models/Cart');

async function GetCart(req, resp) {
    try {
        if (!req.session.user) {
            return resp.status(401).json({ message: "Login required" });
        }

        const userId = req.session.user.id; // Get logged-in user's ID
        const data = await Cart.findOne({ user: userId }).populate("cart.items.product");

        if (!data) {
            return resp.json({ cart: { items: [], totalQty: 0, totalPrice: 0 } });
        }

        resp.json(data);
        console.log(data)
    } catch (error) {
        console.error("Error fetching cart:", error);
        resp.status(500).json({ message: "Error fetching cart" });
    }
}

module.exports = GetCart;
