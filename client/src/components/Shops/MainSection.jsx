import shop from './shop.jpg'
import shops from "../../assets/shop_bag.jpg"
import axios from 'axios'
import { useEffect } from 'react'
import {useState} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BASE_URL = import.meta.env.VITE_BASE_URL


function MainSection()
{
      
    let [shopData,setShopData]=useState([])
    const settings={
        dots:true,
        infinite:true,
    }
    
    useEffect(()=>{
        axios.get(`${BASE_URL}/shop`,{withCredentials:true})
        .then((data)=>{
            console.log(data.data)
            setShopData(data.data)
        })
        .catch((err)=>console.log(err))
    },[]);
    return (
        <div>
            <div className="main-container">
                <div className="left-body">
                    <h1>"One path to all sources of needs".</h1>
                    <p>Ordering from whom you know and faith can yield you a great product.</p>
                </div>
                <div className="right-body">
                    <img src={shops} alt="" />
                    
                    
                </div>                
            </div>
            <div className="shop-section">
                <div className="shop-header-container">
                <h1 className="shop-header">Shops</h1>
                </div>
              
                <div className="shop-container">
                <Slider {...settings}>
                    {
                     shopData ?  shopData.map((shop,index)=>{
                        return(
                        <div className="shop-card" key={index}>
                            {console.log(shop.name)}
                            <h1>{shop.name}</h1>
                            
                            <p className="shop-addr">{shop.address}</p>
                            <p className="shop-owner">{shop.owner.name}</p>
                        
                        </div>
                        )
                       
                     }) :( 
                        <div>
                             {'No shop data available'} 
                        </div>
                    

                     )
                    
                    }
                  
                </Slider>
                </div>
            </div>
        </div>
    )
}

export default MainSection