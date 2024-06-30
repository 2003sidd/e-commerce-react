import React from "react";
// import { useContext } from "react";
// import userContext from "../context/UserContext";
import sidd1 from "../context/UserContext";
const Shop = ()=>{
    const {cart,setCartCount,sidd}=sidd1();
    function changeCartCount(){
        setCartCount(cart+1);
        console.log(sidd)
    }
    return (
        <div>
            shop component work <button onClick={changeCartCount}>increase cart count</button>
        </div>
    )
}
export default Shop;