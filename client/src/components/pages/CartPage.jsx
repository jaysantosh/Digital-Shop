"use client"

import { useState, useEffect } from "react"
import "./CartPage.css"
const BASE_URL = import.meta.env.VITE_BASE_URL

function CartPage() {
  const [cart, setCart] = useState(null)
  let data=null
  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, { credentials: "include" })
      const data = await response.json()
  
      if (response.status === 401 || data.message === "Login required") {
        console.log("User is not logged in.")
        setCart(null) // or redirect user to login
        return
      }
  
      setCart(data)
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }
  const updateQuantity = async (productId, newQuantity,current) => {

    try {
      const response = await fetch(`${BASE_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity: newQuantity,
        }),
      })
      if (response.ok) {
        fetchCart()
      } else {
        throw new Error("Failed to update cart")
      }
    } catch (error) {
      console.error("Error updating cart:", error)
      alert("Failed to update cart")
    }
    
  }

  const removeFromCart = async (productId) => {
    try {
      
      const response = await fetch(`${BASE_URL}/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          productId,
        }),
      })
      if (response.ok) {
        fetchCart()
      } else {
        throw new Error("Failed to remove item from cart")
      }
    } catch (error) {
   
      console.error("Error removing item from cart:", error)
      alert("Failed to remove item from cart")
    }
  }

  if (!cart) return <div>Login Required...</div>
  console.log(cart)

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.cart.items.length ===0? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.cart.items.map((item) => (
              <li key={item.product._id} className="cart-item">
                <img src={item.product.image || "/placeholder.svg"} alt={item.product.name} />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>₹{item.product.price}</p>
                  <div className="quantity-badge">
                        {item.qty} in Cart
                  </div>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.product._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product._id, 1)}>+</button>
                  </div>
                  <div></div>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.product._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Total Items: {cart.cart.totalQty}</p>
            <p>Total Price: ₹{cart.cart.totalPrice}</p>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage

