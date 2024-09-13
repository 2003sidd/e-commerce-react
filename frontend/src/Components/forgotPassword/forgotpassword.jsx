import React from "react";

const forgotPassword=()=>{
    const [number,setNumber]=useState(null);
    const [otp,setOtp]=useState(null);
    let visibiltity=1;
    if(visibiltity){
    return (
        <form>
            <div>
                <label htmlFor="number">Number</label>
                <input type="text" onChange={(e)=>setNumber(e.target.value)}/>

            </div>
        <input type="button" value="submit"/>
        </form>
    )
}
}