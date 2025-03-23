import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL

function ShopkeeperDashboard() {
  const [shops, setShops] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.id)
  useEffect(() => {
    if (!user) return;

    axios
      .get(`${BASE_URL}/shop/owner/`+user.id, { withCredentials: true })
      .then((response) => {setShops(response.data)
        console.log(response.data)
      })
      .catch((error) => console.error("Error fetching shops:", error));
  }, []);

  if (!user || user.role !== "shopkeeper") {
    return <h2>Access Denied</h2>;
  }

  let handleDelete = async (id) => {
    axios.delete("${BASE_URL}/shop/"+id)
    .then(result => console.log(result))
    .catch(err=>console.log(err))
  }

//   useEffect(()=>{
    
//   },[handleDelete])
  

  return (
    <div>
      <h2>My Shops</h2>
      <div>
        <Link to="/create-shop"><button>+</button></Link>
        
      </div>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>
            <Link to={`/shop/${shop._id}`}>{shop.name}</Link>
            <button onClick={()=>handleDelete(shop._id)}>-</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShopkeeperDashboard;
