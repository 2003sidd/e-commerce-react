import { useContext } from "react";
import userContext from "../context/UserContext";

const Faqs = () => {
    // const {cart,setCart}=useContext(userContext);
    // function changeCartCount(){
    //     setCart(cart+1);
    // }
    return (
        <div>
            Faqs work
            <button onClick={changeCartCount}>increase cart count</button>
        </div>
    )
}
export default Faqs;