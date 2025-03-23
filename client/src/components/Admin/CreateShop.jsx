import { useState } from "react";
import "./CreateShop.css";
const BASE_URL = import.meta.env.VITE_BASE_URL

function CreateShop() {
  const [shop, setShop] = useState({
    name: "",
    owner: "",
    address: "",
    gstin: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch(`${BASE_URL}/shop`, {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shop),

      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Shop created successfully!");
        setShop({ name: "", owner: "", address: "", gstin: "" });
      } else {
        setMessage("Error: " + (data.message || "Failed to create shop"));
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    }
  };

  return (
    <div className="create-shop-container">
      <h2>Create a Shop</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="create-shop-form">
        <label>Shop Name:</label>
        <input
          type="text"
          name="name"
          value={shop.name}
          onChange={handleChange}
          required
        />

        <label>Owner Name:</label>
        <input
          type="text"
          name="owner"
          value={shop.owner}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={shop.address}
          onChange={handleChange}
          required
        />

        <label>GSTIN:</label>
        <input
          type="text"
          name="gstin"
          value={shop.gstin}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Shop</button>
      </form>
    </div>
  );
}

export default CreateShop;
