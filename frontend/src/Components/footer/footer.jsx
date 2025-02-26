import React, { useEffect, useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
const Footer = () => {

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 270"><path fill="#DB4444" fillOpacity="1" d="M0,192L60,208C120,224,240,256,360,240C480,224,600,160,720,154.7C840,149,960,203,1080,213.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>

        {/* <div className="footer">
            <div className="footer-container">
                <div className="colume">
                    <h4>Support</h4>
                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>
                </div>
            </div>
            <div className="footer-container">
                <div className="colume">
                    <h4>Support</h4>
                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>
                </div>
            </div>
            <div className="footer-container">
                <div className="colume">
                    <h4>Support</h4>
                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>
                </div>
            </div>
            <div className="footer-container">
                <div className="colume">
                    <h4>Support</h4>
                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>

                </div>
                <div className="colume">
                    <h4>Support</h4>
                </div>
            </div>

        </div> */}

<footer className=" text-white pt-12 pb-8 footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShoeStore</h3>
            <p className="text-white">Your perfect pair awaits.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white border-0">About Us</Link></li>
              <li><Link to="/contact" className="text-white border-0">Contact</Link></li>
              <li><Link to="/category/men" className="text-white border-0">Men's Collection</Link></li>
              <li><Link to="/category/women" className="text-white border-0">Women's Collection</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Policy</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white border-0">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white border-0">Terms & Conditions</Link></li>
              <li><Link to="/shipping" className="text-white border-0">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-white border-0">Returns & Exchanges</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white border-0"><Facebook /></a>
              <a href="#" className="text-white border-0"><Twitter /></a>
              <a href="#" className="text-white border-0"><Instagram /></a>
              <a href="#" className="text-white border-0"><Youtube /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-white">
          <p>&copy; {new Date().getFullYear()} ShoeStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
        </>

    )
};

export default Footer;