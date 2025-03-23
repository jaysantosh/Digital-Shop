import { useState } from "react"
import axios from "axios"
import './Register.css'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("customer")

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/auth/register", { name, email, password, role }, { withCredentials: true })
      alert("Registration successful!")
    } catch (error) {
      alert(error.response.data.message || "Registration failed")
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="shopkeeper">Shopkeeper</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
