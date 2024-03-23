import { useState,useEffect } from "react";
import './home.css';
const Home =()=>{

    let [b,changeb]=useState(0);
    let a =6;
    useEffect(()=>{
        console.log("hey sid, I am calledddddddddddd");
    })
    function addBtn(){
        a++;
        changeb(b+1);
        changeb(b+1);
        changeb(b+1);
        console.log("add value is",a);
    }
    function decBtn(){
        a--;
        console.log("decrement value is",a)
    }
    function getValue(){
        console.log("value is",a)
        console.log("value is",b)
    }

    return (
        <div className="home" style={{height:"300px",backgroundColor:"#5959ff"}}>
            {/* home page {a} , {b} */}
            {/* <br />
            <button onClick={addBtn}>increase value {a} , {b}</button>
            <br />
            <button onClick={decBtn}>increase value {a} , {b}</button>
            <br />
            <button onClick={getValue}>increase value {a} , {b}</button>
            <br /> */}
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni amet cupiditate provident veniam eius fugiat debitis dicta assumenda soluta impedit deserunt a, nemo minima in saepe non quod, qui ratione?
            </span>
            <hr />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis dolores quam veniam ex ratione expedita rem cum! Eos enim dolorum amet sunt sit, voluptatibus quisquam dolor, repellat exercitationem cumque consequatur.</p>

            <div className="scrollbar">
                <div className="scroll-item">item1</div>
                <div className="scroll-item">item2</div>
                <div className="scroll-item">item3</div>
                <div className="scroll-item">item4</div>
                <div className="scroll-item">item5</div>
                <div className="scroll-item">item6</div>
                <div className="scroll-item">item7</div>
                <div className="scroll-item">item8</div>
                <div className="scroll-item">item9</div>
            </div>
        </div>
    );
}
export default Home ;