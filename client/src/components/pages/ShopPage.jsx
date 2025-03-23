
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../ProductCard"
import "./ShopPage.css"

function ShopPage() {
  const { id } = useParams()
  const [shop, setShop] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchShopDetails()
    fetchShopProducts()
  }, [id])

  const fetchShopDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/shop/${id}`)
      const data = await response.json()
      setShop(data)
      // console.log(data[0].name)
    } catch (error) {
      console.error("Error fetching shop details:", error)
    }
  }

  const fetchShopProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`)
      const data = await response.json()
      setProducts(data)
      
    } catch (error) {
      console.error("Error fetching shop products:", error)
    }
  }

  useEffect(() => {
    console.log("Updated shop state:", shop);
  }, [shop]);

  if ( !shop ) return <div>Loading...</div>
  
  return (
    <div className="shop-page">
      <h1>{shop[0]? shop[0].name :''}</h1>
      <p>{shop[0]? shop[0].address : ''}</p>
      <div className="product-grid">
       
         {products.length > 0 ?  products.map((product) => (
          <ProductCard key={product._id} product={product} />
        )): <h1 className="no-products">No Products Found...</h1> }
      </div>
    </div>
  )
}

export default ShopPage

