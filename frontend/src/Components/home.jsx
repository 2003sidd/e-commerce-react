import { useState, useEffect, useRef } from "react";
import Card from "./cards/card";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import './home.css';
const Home = () => {
    const [num,changeNum] = useState(0);

    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }


    function naviagate() {
        const queryParams = { sort: 'price', order: 'asc' };
        const searchParams = new URLSearchParams(queryParams);
        console.log(searchParams.toString())

        // naviagate(`/products?${searchParams.toString()}`);
    }

    function test(){
        changeNum(num =>num+1);


        let x = num;
        console.log("number may suprise you",x);
    }

    return (
        <div className="home" >
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
                    <div className="w-[220px] h-[220px] inline-block p-2 cursor-pointer">item2</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item3</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item4</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item5</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item6</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item7</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item8</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item9</div>
                </div>
                <MdChevronRight className="cursor-pointer bg-gray-300 product-slide" size={40} onClick={slideRight} />
            </div>

            <Card />
        </div>
    );
}
export default Home;