import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Components/home.jsx'
import AboutUs from './Components/about/aboutUs.jsx';
import ContactUs from './Components/contact/contactUs.jsx'
import Faqs from './Components/FAQs.jsx'
import Shop from './Components/shop.jsx'
import Login from './Components/Login/Login.jsx'
import SignUp from './Components/signup/Signup.jsx'
import './style.css';
import Trail from './Components/contact/trail.jsx'
import Collection from './Components/collection/collection.jsx'

// const route=createBrowserRouter([
//     {
        
//         path:'/', 
//         element:<App/>,
//         children:[
//             {
//                 path:"",
//                 element:<Home/>
//             },
//             {
//                 path:"about",
//                 element:<AboutUs/>
//             },
//             {
//                 path:"contact",
//                 element:<ContactUs />
//             }
//         ]
//     }
    
// ])
const route=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} >
            <Route path='' element={<Trail/ >} />
            <Route path='about' element={<AboutUs/ >} />
            <Route path='contact' element={<ContactUs/ >} />
            <Route path='faqs' element={<Faqs/ >} />
            <Route path='shop' element={<Shop/ >} />
            <Route path='login' element={<Login/ >} />
            <Route path='signup' element={<SignUp/ >} />
            <Route path="collection/:gender" element={<Collection />} />
        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={route} />
  );
  