// import React from 'react';
// import { ReactDOM } from 'react-dom/client';
import './header.css';
import '../../utility.css';
import { Link } from 'react-router-dom';
const Header = () => {

  return (

    <div className="header">
    <nav className='nav'>
      <h2>
        Your logo
      </h2>
      <ul className="navList flex">
        <li id="listitem1">
          <Link to='/'>Home</Link>
        </li>
        <li id="listitem3">
          <Link to='/shop'>Shop Now</Link>
        </li>
        <li link="/home" id="listitem2">
          <Link to='/about'>About us</Link>
        </li>
        <li id="listitem4">
          <Link to='/faqs'>FAQ's</Link>
        </li>
        <li id="listitem5">
          <Link to='/contact'>Contact Us</Link>
        </li>
      </ul>
      <div>
        <button>Login</button>
        <button>Sign up</button>
        <button>Sign out</button>

        <button>Cart</button>
        <button>Wishlist</button>
      </div>
    </nav>
        </div>
  )
}
export default Header;