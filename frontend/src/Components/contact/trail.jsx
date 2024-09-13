import { useState } from "react";

const Trail= ()=>{
    const [count,setCount]=useState(0);
    
    function changeCount(){
        setCount(count=>
            {
                count=count+1;
                setCount(count)
            }
        );
    }
    return (
        <div>
        count is : {count}
        <br />
        <br />
        <button onClick={changeCount}>Click </button>
        </div>
    )
};
export default Trail;