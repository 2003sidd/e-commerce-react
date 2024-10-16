import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Components/home.jsx'
import AboutUs from './Components/about/aboutUs.jsx';
import ContactUs from './Components/contact/contactUs.jsx'

import Shop from './Components/shop.jsx'
import Login from "./Components/login/Login.jsx"
import SignUp from './Components/signup/Signup.jsx'
import './style.css';
import Collection from './Components/collection/collection.jsx'
import Faqs from './Components/Faqs/FAQs.jsx'
import Dashboard from './AdminComponent/dashboard/dashboard.jsx'
import CategoryList from './AdminComponent/category/categaryView.jsx'
import CategoryUpsert from './AdminComponent/category/categoryUpsert.jsx'

const CategoryUpsertWithProps = (props) => <CategoryUpsert {...props} />;

const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<App />} >
                <Route path='' element={<Home />} />
                <Route path='about' element={<AboutUs />} />
                <Route path='contact' element={<ContactUs />} />
                <Route path='faqs' element={<Faqs />} />
                <Route path='shop' element={<Shop />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
                <Route path="collection/:gender" element={<Collection />} />
                <Route path="userProfile" element="userProfile" />
                <Route path='admin' element={<Dashboard />} >
                    <Route path='' element={<CategoryUpsertWithProps comp="size" />} />
                    <Route path='size' element={<CategoryUpsertWithProps comp="size" />} />
                    <Route path='color' element={<CategoryUpsertWithProps comp="color" />} />
                    <Route path='category' element={<CategoryUpsertWithProps comp="category" />} />
                    <Route path='addItem' element={<CategoryUpsert />} />
                    <Route path='categoryLIST' element={<CategoryList />} />
                </Route>
            </Route>

        </>
    )
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={route} />
);
