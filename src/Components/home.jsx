import { useState, useEffect,useRef } from "react";
import Card from "./cards/card";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import './home.css';
const Home = () => {
    const [count, setCount] = useState(0);
    const [num, setnum] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const number1 = useRef("");

    useEffect(() => {
        console.log(number1)
        // number1.current = number1.current + 1;
    });

    useEffect(() => {
        console.log("I am called", num)
    }, [count]);
    function changeCount() {
        setCount(count => count + 1);
    }
    function changenum() {
        setCount(num => num + 1);
    }
    const navigation = useNavigate();
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

    return (
        <div className="home" >
            {/*home page image  */}
            <img src="src/assets/images/home.jpg" className="home-image" />


            <div >
                {/* <div > <Link to="/siddhant">Siddhant</Link></div> */}
                <div onClick={changeCount}>Siddhant</div>
                <div onClick={changenum}>Abhay</div>
                <div></div>
                <div></div>
                  <input
        type="text"
        ref={number1}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {number1.current}</h1>

            </div>


            {/* shoe by collection */}
            <div className="collection">
                <div className="men">Men <Link to={"collection/men"}>Men</Link> </div>
                <div className="women">Women</div>
            </div>

            {/* home page slider of reccommanded or top product */}
            <div className="relative flex items-center">
                <MdChevronLeft size={40} className="cursor-pointer" onClick={slideLeft} />
                <div id="slider" className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    <div className="w-[220px] inline-block p-2 cursor-pointer"></div>
                    <div className="w-[220px] h-[220px] inline-block p-2 cursor-pointer">item2</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item3</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item4</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item5</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item6</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item7</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item8</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item9</div>
                </div>
                <MdChevronRight size={40} onClick={slideRight} />
            </div>

            <Card />
        </div>
    );
}
export default Home;