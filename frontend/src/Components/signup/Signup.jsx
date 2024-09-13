import React from "react";
import axios from "axios";
import "./signup.css"
const SignUp = () => {
    const [name, setName] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    function handleSubmit(event) {
        event.preventDefault();
        console.log(name)
        console.log(number)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        let postData = {
            name: name,
            number: number,
            email: email,
            password: password,
            confirmPassword:confirmPassword
        }
        axios.post('http://localhost:8800/route/users/signup', postData)
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

                <form onSubmit={handleSubmit}>
                    <h2 className="heading">Sign up</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="enter your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Number</label>
                        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="enter your mobile number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter your password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="reenter your password" />
                    </div>
                    <div className="submit">
                    <button className="submit-btn" type="submit">Create Account</button>
                    </div>

                </form>
            </div>

        </>

    )
}
export default SignUp