
import { useState } from "react"
import "./ProductCard.css"
const BASE_URL = import.meta.env.VITE_BASE_URL

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1)

  const addToCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      })
      let data = await response.json()
      if (response.ok) {
        alert("Product added to cart!")
        console.log(data)
      } else{
        alert(data.message)
        console.log(response)
      }
    } 
    catch (error) {
      console.error("Error adding product to cart:", error)
      alert("Failed to add product to cart")
    }
  }

  return (
    <div className="product-card">
      <img src={product.image || "/toor.jpeg"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">₹{product.price}</p>
      <div className="quantity-control">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button className="add-to-cart" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard

