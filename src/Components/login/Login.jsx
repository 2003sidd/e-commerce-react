import React from "react";
import axios from "axios";
const Login=()=>{
    const [number,setNumber]=React.useState('');
    const [password,setPassword]=React.useState('');
    function handleSubmit(event){
        event.preventDefault();
        console.log(number);
        console.log(password);
        let postData={
            email:number,
            password:password
        }
        axios.post('http://localhost:8080/login', postData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const container={
        display:"flex",
        justifyContent:"center",
        height:"80vh",
        flexDirection:"column",
        alignItem:"center",
    }
    const style={
        display:"flex",
        justifyContent:"Center",
        flexDirection:"column"

    };
    const sid={
        textAlign:"Center",
    }
    return (
        <>
        <div style={container}>
        <h1>Sign In</h1>
        <form  onSubmit={handleSubmit}>
            <div style={style} className="formGroup">
                <label htmlFor="number">Enter mobile number</label>
                <input type="text" onChange={(e)=>setNumber(e.target.value)} name="mobile_number" id="number" value={number} placeholder="Enter mobile number"/>
            </div>
            <div style={style} className="formGroup">
                <label htmlFor="password">Enter password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" id="password" value={password} placeholder="Enter password"/>
            </div>
            <div style={sid}>
            <input type="submit" value="Submit" />
            </div>
        </form>
        </div>
        </>
    )
}
export default Login ;