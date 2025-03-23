import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./components/pages/HomePage"
import ShopPage from "./components/pages/ShopPage"
import CartPage from "./components/pages/CartPage"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"

//Admin
import CreateShop from "./components/Admin/CreateShop"

import "./App.css"
import ShopkeeperDashboard from "./components/pages/ShopKeeperDashboard"


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/shop/:id" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/create-shop" element={<CreateShop/>}/>
            <Route path="/shop-dashboard" element={<ShopkeeperDashboard/>}/>
          
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
