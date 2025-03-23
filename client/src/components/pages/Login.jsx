import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Login.css"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [role,setRole] = useState("")
  // const [name,setName] = useState("")
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password }, { withCredentials: true })
      localStorage.setItem("user", JSON.stringify(res.data)) // Store session
      alert("Login successful!")
      navigate("/")
    } catch (error) {
      alert(error.response.data.message || "Login failed")
    }
  }


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      {/* <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /> */}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {/* <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
          <option value="customer">Customer</option>
          <option value="shopkeeper">Shopkeeper</option>
          <option value="admin">Admin</option>
        </select> */}
        <button type="submit">Login</button>
        <button><a href="/Register">Register</a></button>
      </form>
    </div>
  )
}

export default Login
