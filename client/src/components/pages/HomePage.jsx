"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./HomePage.css"
const BASE_URL = import.meta.env.VITE_BASE_URL

function HomePage() {
  const [shops, setShops] = useState([])

  useEffect(() => {
    fetchShops()
  }, [])

  const fetchShops = async () => {
    try {
      const response = await fetch(`${BASE_URL}/shop`)
      const data = await response.json()
   
      setShops(data)
    } catch (error) {
      console.error("Error fetching shops:", error)
    }
  }


  return (
    <div className="home-page">
      <h1>Welcome to LocalShops</h1>
      <div className="shop-grid">
        {shops.map((shop) => (
          <Link to={`/shop/${shop._id}`} key={shop._id} className="shop-card">
            <img src={shop.image || "/shop.jpg"} alt={shop.name} />
            <h2>{shop.name}</h2>
            <p>{shop.address}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage

