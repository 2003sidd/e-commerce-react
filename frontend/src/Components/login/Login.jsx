import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css"
const Login = () => {
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
            
                <div className="flex h-1">
                    <img src="src/assets/images/aboutUsImg.jpg" className="flex-grow " style={{maxWidth:"60vw"}} />
                    <div>
                        <form onSubmit={(e) => handleLogin(e)}>
                            <h1 className="text-center text-xl text-bold">Sign In</h1>
                            <div className="form-group">
                                <label htmlFor="number">Mobile number</label>
                                <input type="text" onChange={(e) => handleDataChange(e)} name="number" id="number" value={formData.number} placeholder="Enter mobile number" />
                                {error.number && <span className="text-red-500">Number is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={(e) => handleDataChange(e)} name="password" id="password" value={formData.password} placeholder="Enter password" />
                                {error.password && <span className="text-red-500">Password is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Submit" />
                            </div>
                            <div className="form-group text-2">
                                <Link to="/signup">
                                    Register yourself ?
                                </Link></div>

                        </form>
                    </div>

                </div>
         
        </>
    )
}
export default Login;