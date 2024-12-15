import { useState, useEffect, useRef } from "react";
import Card from "./cards/card";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import './home.css';
import useUserContext from "../context/UserContext";
const Home = () => {
    const [num, changeNum] = useState(0);
    const { userDetails, setUserDetails } = useUserContext();

    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
        
    }

    const notify = () => {
        toast.error("Success Notification !", {
            position: "top-right"
          });
    console.log("Toast message")
    }

    

    function naviagate() {
        const queryParams = { sort: 'price', order: 'asc' };
        const searchParams = new URLSearchParams(queryParams);
        console.log(searchParams.toString())

        // naviagate(`/products?${searchParams.toString()}`);
    }

    function test() {
        changeNum(num => num + 1);


        let x = num;
        console.log("number may suprise you", x);
    }

    return (
        <div className="home" >
             <ToastContainer />
            {/*home page image  */}
            <img src="src/assets/images/home.jpg" className="home-image" />

            {/* shoe by collection */}
            <div className="collection">
                <div className="men">
                    <span onClick={test}>Men {num}</span>
                    <img src="src/assets/images/maleShoe.jpg" />
                </div>
                <div className="women">
                <span>Women</span>
                <img src="src/assets/images/femaleShoe.jpg" />
                </div>
            </div>

            {/* home page slider of reccommanded or top product */}
            <div className="relative flex items-center">
                <MdChevronLeft size={40} className="cursor-pointer bg-gray-300 product-slide" onClick={slideLeft} />
                <div id="slider" className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    <div className="w-[220px] inline-block p-2 cursor-pointer">
                        <img path="" className="image"/>
                    </div>
                    <div className="w-[220px] h-[220px] inline-block p-2 cursor-pointer">{userDetails?.name}</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer" onClick={() => setUserDetails({ name: "sidd", age: 19 })}
                    >item3</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item4</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item5</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item6</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item7</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item8</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item9</div>
                </div>
                <MdChevronRight className="cursor-pointer bg-gray-300 product-slide" size={40} onClick={slideRight} />
            </div>

            <button onClick={notify}>Notify!</button>

            <Card />
        </div >
    );
}
export default Home;