import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Header />
      <div className=' bg-gray-400 bg-opacity-50 w-full h-full p-4 mb-auto'>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
