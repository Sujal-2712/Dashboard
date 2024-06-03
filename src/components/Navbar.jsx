import React from 'react';
import { IoIosLogOut } from "react-icons/io";
import Cookies from 'js-cookie'; // Correct import for cookies
import FullScreenButton from './FullScreenButton';

const NavBar = () => {
  const handleLogout=()=>{
    Cookies.remove('jwt');
    window.location.href = '/';
  }
  return (
    <div className='bg-slate-900 w-full box-border h-fit flex justify-between p-4 px-6 text-white items-center'>
        <span className='text-2xl'><FullScreenButton/></span>
        <button onClick={handleLogout}><span className='text-2xl hover:bg-red-600'><IoIosLogOut/></span></button>
    </div>
  );
}

export default NavBar;