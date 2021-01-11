import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className='bg-black p-4 h-2/5 py-4'>
      <div className='container mx-auto text-center text-gray-500'>
        Projeto desenvolvido por{" "}
        {/* <a
          className='hover:underline text-gray-500'
          href='http://www.google.com'
          target='blank'
        > */}
        <span className='text-lg'> Robson Silveira</span>
        {/* </a>{" "} */} |{" "}
        <a
          className='hover:underline text-blue-500 text-lg'
          href='https://www.linkedin.com/in/robson-silveira-42328974/'
          target='blank'
        >
          {" "}
          Linkedin{" "}
        </a>{" "}
        |{" "}
        <a
          className='hover:underline text-red-500 text-lg'
          href='https://github.com/RobsonSilveira'
          target='blank'
        >
          Github
        </a>
      </div>
      <div className='container mx-auto text-center mt-4'>
        <img className='inline p-4' src='/logo_fsm.png' alt='FSM' />
        <img className='inline p-4' src='/logo_devpleno.png' alt='DEVPLENO' />
      </div>
    </div>
  );
};
export default Footer;
