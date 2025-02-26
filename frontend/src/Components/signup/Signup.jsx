import React from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from "../../utilities/apiCall";
const SignUp = () => {
  const navigate = useNavigate();

    const [signUpForm, setSignUpForm] = React.useState({
        name:'',
        number:'',
        email:'',
        password:'',
        confirmPassword:''
            })
 
  const [error, setError] = React.useState(null);

  // Function to validate the form fields
  function checkSignup() {
    const error = {};
    let isErrorOccurred = false;

    // Name validation
    if (signUpForm.name === "") {
      error.name = "Name is required";
      isErrorOccurred = true;
    }

    // Number validation
    if (signUpForm.number === "") {
      error.number = "Number is required";
      isErrorOccurred = true;
    } else if (!/^\d{10}$/.test(signUpForm.number)) {
      error.number = "Please enter a valid 10-digit phone number";
      isErrorOccurred = true;
    }

    // Email validation
    if (signUpForm.email === "") {
      error.email = "Email is required";
      isErrorOccurred = true;
    } else if (!/\S+@\S+\.\S+/.test(signUpForm.email )) {
      error.email = "Please enter a valid email address";
      isErrorOccurred = true;
    }

    // Password validation
    if (signUpForm.password === "") {
      error.password = "Password is required";
      isErrorOccurred = true;
    } else if (signUpForm.password.length < 6) {
      error.password = "Password must be at least 6 characters";
      isErrorOccurred = true;
    }

    // Confirm password validation
    if (signUpForm.confirmPassword === "") {
      error.confirmPassword = "Please confirm your password";
      isErrorOccurred = true;
    } else if (signUpForm.confirmPassword !== signUpForm.password) {
      error.confirmPassword = "Passwords do not match";
      isErrorOccurred = true;
    }

    setError(error);
    return isErrorOccurred;
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    console.log("form is",signUpForm)
    if (!checkSignup()) {
      api.post("users/signup",signUpForm).then((response)=>{
        const data = response;
        // if(data.status){
          console.log(data);
          localStorage.setItem("accessToken", data.data.accessToken);
                      navigate("/home")
        // }else{

        // }
      }).catch((error)=>{
        console.log("Error",error);
        
      })
     
    //   axios.post('http://localhost:8800/route/users/signup', signUpForm, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then((response) => {
    //       const data = response.data;
    //       console.log(data);

    //       if (data && data.data && data.data.accessToken ) {

    //             localStorage.setItem("accessToken", data.data.accessToken);
    //             navigate("/home")
            
    //     } else {
    //         console.log("Token not received or is invalid");
    //     }
    //     })
    //     .catch((error) => {
    //       toast.error("Something went wrong!", {
    //         position: "top-right"
    //       });
    //       console.error(error);
    //     });
    }
  }

  return (
    <>
    
      <div className="flex h-screen">
        <img src="src/assets/images/aboutUsImg.jpg" className="flex-grow max-w-[60vw]" />
        <div className="flex flex-grow items-center px-4">
        <ToastContainer />

          <form className="w-full border-0" onSubmit={(e) => handleSubmit(e)}>

            <h2 className="text-center text-2xl my-4 bold">Sign up</h2>

            <div className="flex flex-col">

              <input 
                className="w-full px-2 py-1 bg-gray-100 border-2   rounded-lg" 
                type="text" 
                value={signUpForm.name} 
                onChange={(e) => setSignUpForm(prevState => ({
                    ...prevState,
                    name: e.target.value
                }))
                } 
                placeholder="Name" 
              />
              {error?.name && <span className="px-4 text-red-400">{error?.name}</span>}

              <input 
                className="w-full px-2 py-1 my-1 bg-gray-100 border-2   rounded-lg" 
                type="text" 
                value={signUpForm.number}
                onChange={(e) => setSignUpForm(prevState => ({
                    ...prevState,
                    number: e.target.value
                }))
                } 
                placeholder="Number" 
              />
              {error?.number && <span className="px-4 text-red-400">{error?.number}</span>}

              <input 
                className="w-full px-2 py-1 my-1 bg-gray-100 border-2  rounded-lg" 
                type="text" 
                value={signUpForm.email}
                onChange={(e) => setSignUpForm(prevState => ({
                    ...prevState,
                    email: e.target.value
                }))
                } 
                placeholder="Email" 
              />
              {error?.email && <span className="px-4 text-red-400">{error?.email}</span>}

              <input 
                className="w-full px-2 py-1 my-1 bg-gray-100 border-2  rounded-lg" 
                type="password" 
                value={signUpForm.password}
                onChange={(e) => setSignUpForm(prevState => ({
                    ...prevState,
                    password: e.target.value
                }))
                } 
                placeholder="Password" 
              />
              {error?.password && <span className="px-4 text-red-400">{error?.password}</span>}

              <input 
                className="w-full px-2 py-1 my-1 bg-gray-100 border-2  rounded-lg" 
                type="password" 
                value={signUpForm.confirmPassword}
                onChange={(e) => setSignUpForm(prevState => ({
                    ...prevState,
                    confirmPassword: e.target.value
                }))
                } 
                placeholder="Confirm Password" 
              />
              {error?.confirmPassword && <span className="px-4 text-red-400">{error?.confirmPassword}</span>}

              <button 
                className="w-full p-1 my-2 rounded-lg my-1 text-xl text-white" 
                style={{ backgroundColor: "var(--primary-color)" }} 
                type="submit"
              >
                Create Account
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
