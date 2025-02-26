import { useState, useEffect, useRef } from "react";
import Card from "./cards/card";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import './home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import { products } from '../data/products';
import HeroSlider from "./HeroSlider/heroSlider";
import ProductGrid from "./productGrid/ProductGrid";


const Home = () => {

    const popularProducts = products.filter(p => p.isPopular);
    const latestProducts = products.filter(p => p.isLatest);



    return (
        <>

            <div>
                <HeroSlider />

                <section className="container flex flex-col mx-auto px-4 py-16 flex flex-col">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Link to="/collection/men">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative h-96 rounded-lg overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1527010154944-f2241763d806"
                                    alt="Men's Collection"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                    <h2 className="text-white text-4xl font-bold">Men's Collection</h2>
                                </div>
                            </motion.div>
                        </Link>

                        <Link to="/collection/women">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative h-96 rounded-lg overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1535043934128-cf0b28d52f95"
                                    alt="Women's Collection"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                    <h2 className="text-white text-4xl font-bold">Women's Collection</h2>
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8">Popular Products</h2>
                        <ProductGrid products={popularProducts} />
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8">Latest Arrivals</h2>
                        <ProductGrid products={latestProducts} />
                    </div>
                </section>
            </div>


            {/* home page slider of reccommanded or top product */}
            {/* <div className="relative flex items-center">
                <MdChevronLeft size={40} className="cursor-pointer bg-gray-300 product-slide" onClick={slideLeft} />
                <div id="slider" className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    <div className="w-[220px] inline-block p-2 cursor-pointer">
                        <img path="" className="image" />
                    </div>
                    <div className="w-[220px] h-[220px] inline-block p-2 cursor-pointer">{userDetails?.name}</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer" onClick={() => setUserDetails({ name: "sidd", age: 19 })}
                    >item3</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item4</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item5</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item6</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item7</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item8</div>
                    <div className="w-[220px] inline-block p-2 cursor-pointer">item9</div>
                </div>
                <MdChevronRight className="cursor-pointer bg-gray-300 product-slide" size={40} onClick={slideRight} />
            </div> */}



            <Card />
        </ >
    );
}
export default Home;