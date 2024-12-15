import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css"
import useUserContext from '../../context/UserContext';

const Login = () => {
    const { setUserDetails } = useUserContext();
    const [formData, setFormData] = React.useState({
        number: "",
        password: ""
    })
    const [error, setError] = React.useState({})

    function handleDataChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })

    }
    function checkValidation() {
        let isErrorOccured = false;
        const error = {};
        if (formData.number === "") {
            error.number = "Number is required."
            isErrorOccured = true;

        }
        if (formData.password === "") {
            error.password = "Password is required"
            isErrorOccured = true;
        }
        setError(error)
        return isErrorOccured;
    }
    function handleLogin(event) {
        event.preventDefault()
        if (!checkValidation()) {
            console.log("form is all right");
            axios.post('http://localhost:8800/route/users/login', formData)
                .then((response) => {
                    console.log(response.data)
                    setUserDetails(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log("form is not right");

        }
    }



    return (
        <>
            
                <div className="flex h-screen" >
                    <img src="src/assets/images/aboutUsImg.jpg" className="flex-grow max-w-[60vw]"  />
                    <div className="flex flex-grow items-center px-2">
                        <form className="w-full border-0" onSubmit={(e) => handleLogin(e)}>
                            <h1 className="text-center text-xl text-bold">Sign In</h1>
                        
                                <input type="text" onChange={(e) => handleDataChange(e)} name="number" value={formData.number} placeholder="Number" className="input my-1 w-full px-2 py-1 rounded-lg" />
                                {error.number && <span className="text-red-500">Number is required</span>}
                           
                                <input type="password" onChange={(e) => handleDataChange(e)} name="password" value={formData.password} placeholder="Password" className="input my-1  w-full px-2 py-1 rounded-lg" />
                                {error.password && <span className="text-red-500">Password is required</span>}
                    
                            <button className="w-full my-1 p-1 rounded-lg text-xl text-white" style={{backgroundColor:"var(--primary-color)"}} type="submit">Login</button>

                            <div className="form-group text-2 text-center mt-4">
                               Don't have an account? <Link to="/signup" className="text-red-500">
                                    Register yourself 
                                </Link></div>

                        </form>
                    </div>

                </div>
         
        </>
    )
}
export default Login;