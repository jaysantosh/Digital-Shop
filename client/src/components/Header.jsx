import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState();
  
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: "include" });
      if (response) {
        toast.success("Successfully Logged Out!");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/"), 2000); // Redirect after toast
      }
    } catch (error) {
      toast.error("Logout failed! Please try again.");
      console.error(error);
    }
  };

  let role = JSON.parse(localStorage.getItem("user"))?.role;
  console.log(role);

  return (
    <header className="header">
      <ToastContainer position="top-right" autoClose={2000} />
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
              {localStorage.getItem("user") ? (
                <Link onClick={handleLogout}>Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              {role === "shopkeeper" ? <Link to="/shop-dashboard">Manage Shops</Link> : ""}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
