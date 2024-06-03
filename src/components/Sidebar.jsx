import React, { useState } from 'react';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ SideLink, activeNavIndex, setActiveNavIndex }) => {
  const variants = {
    expanded: { width: "25%" },
    nonExpanded: { width: "5%" }
  };
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    // <motion.div animate={isExpanded ? "expanded" : "nonExpanded"} variants={variants} className='min-h-screen bg-slate-900 relative'>
    //   <div className='logo px-10 pt-10 pb-4'>
    //     <img src="https://arjunbala.com/nishthadashboarddemo/NisthaDashboard/Sales/images/auth-bg/Final%20Yantra%20Logo.png" alt="Yantra Logo" />
    //   </div>
    //   <hr />

    //   <div onClick={() => { setIsExpanded(!isExpanded); }} className={`w-6 h-6 bg-sky-400 rounded-full absolute ${isExpanded ? "-right-2 top-[4.8rem]" : "-right-2 top-12 rotate-180"} flex justify-center items-center text-[1.3rem]`}>
    //     <MdKeyboardDoubleArrowLeft />
    //   </div>

    //   <div className='mt-5 text-white font-semibold'>
    //     <div className={`flex flex-col space-y-6 ${isExpanded ? "px-8" : "px-2"}`}>
    //       {SideLink.map((item, index) => (
    //         <div key={index} className={`cursor-pointer rounded-2xl flex items-center gap-2 ${activeNavIndex === index ? "bg-sky-400 font-semibold text-black" : ""} ${isExpanded ? "px-3 py-2" : "py-2 px-0 justify-center"}`} onClick={() => {
    //           setActiveNavIndex(index);
    //           navigate(item.link);
    //         }}>
    //           <span className='text-[1.5rem]'>{item.icon}</span>
    //           <span className={isExpanded ? "block" : "hidden"}>{item.name}</span>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </motion.div>
    <>
    
    </>
  );
}

export default NavigationBar;
