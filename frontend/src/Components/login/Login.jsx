import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./login.css"
const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handleSubmit(event) {
        event.preventDefault();
        console.log(number);
        console.log(email);
        let postData = {
            email: email,
            password: password
        }
        axios.post('http://localhost:8800/route/users/login', postData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <>
            <div className="container">
                <div className="login-page">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="number">Mobile number</label>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} name="mobile_number" id="number" value={email} placeholder="Enter mobile number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" value={password} placeholder="Enter password" />
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