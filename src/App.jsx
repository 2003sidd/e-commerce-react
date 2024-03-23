import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/header/header.jsx';
import Footer from './Components/footer/footer.jsx';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
