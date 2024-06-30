import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/header/header.jsx';
import Footer from './Components/footer/footer.jsx';
import { Context } from './context/UserContext.js';
import Shop from './Components/shop.jsx';


function App() {
  const [cart,setCartCount]=useState(0);
  let sidd="siddhant"

  return (
    <>
    <Context value={{cart,setCartCount,sidd}}>
      <Header />
      <Outlet />
      <Footer />
    </Context>
    </>
  );
}

export default App;
