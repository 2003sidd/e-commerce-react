import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/header/header.jsx';
import Footer from './Components/footer/footer.jsx';


function App() {
  const [cart, setCartCount] = useState(0);
  let sidd = "siddhant"

  return (
    <>

      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
