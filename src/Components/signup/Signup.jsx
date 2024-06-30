import React from "react";
import axios from "axios";
const SignUp=()=>{
    const [name,setName]=React.useState('')
    const [number,setNumber]=React.useState('')
    const [email,setEmail]=React.useState('')
    const [password,setPassword]=React.useState('')

    function handleSubmit(event){
        event.preventDefault();
        console.log(name)
        console.log(number)
        console.log(email)
        console.log(password)
        let postData={
            name:name,
            number:number,
            email:email,
            password:password
        }
        axios.post('http://localhost:8080/signup', postData)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
        });
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="formGroup">
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter your name"/>
        </div>
        <div className="formGroup">
            <label htmlFor="number">Number</label>
            <input type="text" value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="enter your mobile number"/>
        </div>
        <div className="formGroup">
            <label htmlFor="name">Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email"/>
        </div>
        <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/>
        </div>
        <button type="submit">Create Account</button>

        </form>
        
        
        </>
        
    )
}
export default SignUp