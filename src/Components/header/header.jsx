import './header.css';
import '../../utility.css';
import { Link } from 'react-router-dom';
import sidd from '../../context/UserContext';
const Header = () => {
  const {cart}=sidd();
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
        <button>
          <Link to='/login'>Login</Link>
          </button>
        <button>
        <Link to='/signup'>Sign up</Link>
          </button>
        <button>Sign out</button>

        <button>Cart {cart}</button>
        <button>Wishlist</button>
      </div>
    </nav>
        </div>
  )
}
export default Header;