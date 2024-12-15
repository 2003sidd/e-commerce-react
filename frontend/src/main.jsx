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
import SizeList from './AdminComponent/size/sizeList.jsx'
import ColorList from './AdminComponent/color/colorList.jsx'
import SizeUpsert from './AdminComponent/size/sizeUpsert.jsx'
import ColorUpsert from './AdminComponent/color/colorUpsert.jsx'
import BrandUpsert from './AdminComponent/brand/brandUpsert.jsx'
import BrandList from './AdminComponent/brand/brandlist.jsx'
import UserFormArray from './AdminComponent/users/user.jsx'
import ProductUpsert from './AdminComponent/product/product.jsx'

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
                    <Route path='size' element={<SizeList/>} />
                    <Route path='color' element={<ColorList/>} />
                    <Route path='category' element={<CategoryList />} />
                    <Route path='sizeupsert' element={<SizeUpsert/>} />
                    <Route path='colorupsert' element={<ColorUpsert/>} />
                    <Route path='categoryupsert' element={<CategoryUpsert />} />
                    <Route path='addItem' element={<CategoryUpsert />} />
                    <Route path='addBrand' element={<BrandUpsert />} />
                    <Route path='brand' element={<BrandList />} />
                    <Route path='users' element={<UserFormArray />} />
                    <Route path='product' element={<ProductUpsert />} />

                    <Route path='categoryLIST' element={<CategoryList />} />
                </Route>
            </Route>

        </>
    )
)


ReactDOM.createRoot(document.getElementById('root')).render(
    
    <RouterProvider router={route} />

);
