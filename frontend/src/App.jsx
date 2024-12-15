import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Components/header/header.jsx';
import Footer from './Components/footer/footer.jsx';
import { UserContextProvider } from './context/UserContext.js'


function App() {

  const location = useLocation();
  const [userDetails, setUserDetails] = React.useState(null);

  useEffect(() => {
    // Check if userDetails exists in localStorage and update state
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails)); // Parse and set the user details
    }
  }, []);

  // Check if the current path is the login path
  const isLoginPage = location.pathname === '/login'
  const isHeaderPage = location.pathname === '/signup'
  return (
    <>
      <UserContextProvider value={{ userDetails, setUserDetails }}>
        {!(isLoginPage || isHeaderPage) && <Header />}
        <Outlet />
        {!(isLoginPage || isHeaderPage) && <Footer />}

      </UserContextProvider>


    </>
  );
}

export default App;
