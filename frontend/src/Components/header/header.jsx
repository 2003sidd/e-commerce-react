import './header.css';
import '../../utility.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faMagnifyingGlass , faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Search, Menu, User, Heart, LogOut } from 'lucide-react';
import useUserContext from '../../context/UserContext';
import api from '../../utilities/apiCall';
const Header = () => {
  const { userDetails } = useUserContext();

  const handleUserClick = ()=>{
    const user = localStorage.getItem("accessToken")
    if(user === null ){
      console.log("user is not logged in")
    }else{
      console.log("user is logged in")
    }
  }

  const apiCall = () => {
    api.get("route/api/category")
  }

  return (

    <>
      <header>
        <marquee direction="left" scrollamount="10">
          Your Sole Mate Awaits.
        </marquee>
      </header>
      <nav className='nav'>
        <h1 onClick={apiCall} className='text-2xl font-bold color-primary'>
          Footwear Fusion
        </h1>
        <ul className="navList flex hidden md:flex ">
          <li className='font-medium'>
            <NavLink to='/'>Home</NavLink >
          </li>
         <li className='font-medium'>
            <NavLink to='/admin'>Admin</NavLink >
          </li>
          {/* <li id="listitem3">
          <NavLink  to='/shop'>Shop Now</NavLink >
        </li> */}
          <li link="/home" className='font-medium'>
            <NavLink to='/about' >About us</NavLink >
          </li>
          <li className='font-medium '>
            <NavLink to='/faqs'>FAQ's</NavLink >
          </li>
          <li className='font-medium'>
            <NavLink to='/contact'>Contact Us</NavLink >
          </li>
        </ul>
        <div className='nav-btn'>
          <button className='mx-4'>
            <Link to='/cart'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
          </button>
          <button className='mx-4'>
            <Link to='/cart'>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </button>
          <button className='mx-4'>
            <Link to='/wishlist'>
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          </button>
          <button className='mx-2' onClick={handleUserClick}>
                   
                <FontAwesomeIcon icon={faUser} />
         
          </button>
        </div>

        <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
            <Menu size={20} />
          </button>
      </nav>
    </>
  )
}
export default Header;