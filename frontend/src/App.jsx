import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Components/header/header.jsx';
import Footer from './Components/footer/footer.jsx';


function App() {
  const [cart, setCartCount] = useState(0);
  let sidd = "siddhant"

  const location = useLocation();

  // Check if the current path is the login path
  const isLoginPage = location.pathname === '/login'

  return (
    <>

      {!isLoginPage && <Header />}
      <Outlet />
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
