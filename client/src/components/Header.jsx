import { Link, useNavigate } from "react-router-dom"
import "./Header.css"
import axios from 'axios'
import { useState } from "react"
const BASE_URL = import.meta.env.VITE_BASE_URL
function Header() {
  const navigate = useNavigate()
  const [isAuthenticated,setIsAuthenticated] = useState()
  const handleLogout = async()=>{
    const response = await axios.post(`${BASE_URL}/auth/logout`,{},{withCredentials:"include"})
    if(response)
    {
      alert("successfully Logged out")
      localStorage.removeItem("user")
      navigate("/")
    }
     
    else 
      console.log(console.error())
      
  }

  let role = JSON.parse(localStorage.getItem("user")) ?.role
  console.log(role)
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          LocalShops
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              {localStorage.getItem("user") ? 
              <Link onClick={handleLogout}>Logout</Link>
              : <Link to="/login">Login</Link>
              }
            </li>
            <li>
            {
              // role === "shopkeeper" ? <Link to="/create-shop">Create Shop</Link> : ''
              role === "shopkeeper" ? <Link to="/shop-dashboard">Manage Shops</Link> : ''
            }
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

