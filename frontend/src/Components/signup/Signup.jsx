import React from "react";
import axios from "axios";
import "./signup.css"
const SignUp = () => {
    const [name, setName] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [error,setError]=React.useState(null);

    function checkSignup(){
        const error = {};
        let isErrorOccured=false;
        if(name===""){
            error.name="name is required";
            isErrorOccured=true;
        }

        if(number===""){
            error.number="number is required";
            isErrorOccured=true;
        }

        if(email===""){
            error.email="email is required";
            isErrorOccured=true;
        }

        if(password===""){
            error.password="password is required";
            isErrorOccured=true;
        }

        if(confirmPassword===""){
            error.confirmPassword="confirm Password is required";
            isErrorOccured=true;
        }
        setError(error);
        return isErrorOccured;
    }

    function handleSubmit(event) {

        event.preventDefault();
        if(!checkSignup()){
            let postData = {
                name: name,
                number: number,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            axios.post('http://localhost:8800/route/users/signup', postData)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
        }else{
            
        }
       
        
    }
    return (
        <>
            <div className="flex h-screen" >
                <img src="src/assets/images/aboutUsImg.jpg" className="flex-grow max-w-[60vw]" />
                <div className="flex flex-grow items-center px-4">
                    <form className="w-full border-0" onSubmit={(e) => handleSubmit(e)}>

                        <h2 className="text-center text-2xl bold">Sign up</h2>
                   
                            <input className="w-full px-2 py-1 my-1 input rounded-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        
                    
                            <input className="w-full px-2 py-1 my-1 input rounded-lg" type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Number" />
                        
                            <input className="w-full px-2 py-1 my-1 input rounded-lg" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                       
                            <input className="w-full px-2 py-1 my-1 input rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                      
                            <input className="w-full px-2 py-1 my-1 input rounded-lg" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Renter password" />
             
                            <button className="w-full p-1 rounded-lg my-1 text-xl text-white" style={{backgroundColor:"var(--primary-color)"}} type="submit">Create Account</button>
                      

                    </form>
                </div>
            </div>

        </>

    )
}
export default SignUp