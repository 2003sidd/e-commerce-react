import './header.css';
import '../../utility.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import useUserContext from '../../context/UserContext';
const Header = () => {
  const { userDetails } = useUserContext();

  return (

    <>
      <header>
        Your Sole Mate Awaits.
      </header>
      <nav className='nav'>
        <h1 className='text-2xl font-bold'>
          Footwear Fusion
        </h1>
        <ul className="navList flex">
          <li className='font-medium'>
            <NavLink to='/'>Home</NavLink >
          </li>
          {userDetails?.isAdmin == 1 && <li className='font-medium'>
            <NavLink to='/admin'>Admin</NavLink >
          </li>}
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
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button className='mx-4'>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className='mx-2'>
          {userDetails ==null?
            <Link to='/login'>
              <FontAwesomeIcon icon={faUser} />
            </Link>: <Link to='/contact'>
              <FontAwesomeIcon icon={faUser} />
            </Link>}
          </button>
        </div>
      </nav>
    </>
  )
}
export default Header;