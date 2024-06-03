import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { IoIosAddCircle, IoIosExpand } from "react-icons/io";
import { Outlet } from 'react-router-dom';
import FullScreenButton from './FullScreenButton';
import { motion } from 'framer-motion';
import { IoIosLogOut } from "react-icons/io";
import Cookies from 'js-cookie';
const SideLink = [
    {
        name: "Rajkot",
        icon: <IoHome />,
        link: "/user",
    },
    {
        name: "Surat",
        icon: <IoHome />,
        link: "/user/surat",
    },
    {
        name: "Generate Code",
        icon: <FaCode />,
        link: "/user/GenerateCode"
    },
    {
        name: "Add Wheel Company",
        icon: <IoIosAddCircle />,
        link: "/user/AddWheelCompany"
    }
];

const variants = {
    expanded: {
        width: "20%",
        
    },
    nonExpanded: {
        width: "0%"
    }
}

function Layout() {
    const handleLogout = () => {
        Cookies.remove('jwt');
        window.location.href = '/';
    }

    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setisExpanded] = useState(true);

    const navigate = useNavigate();
    return (
        <div>
            <div className='h-full'>
                <div className="app-page flex-column flex-column-fluid" id="kt_app_page">

                    <div id="kt_app_header" className="app-header h-20 bg-black">

                        <div className="app-container container-fluid d-flex align-items-stretch justify-content-between"
                            id="kt_app_header_container">

                            <div className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
                                <div onClick={() => {
                                    setisExpanded(!isExpanded);
                                }} className="btn btn-icon btn-active-color-primary w-35px h-25px"
                                    id="kt_app_sidebar_mobile_toggle">
                                    <i className="ki-duotone ki-abstract-14 fs-2 fs-md-1">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                </div>
                            </div>

                            <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
                                id="kt_app_header_wrapper">

                                <div className='flex justify-center items-center lg:mr-0 mr-6'>
                                    <div className='lg:p-10'>
                                        <img src="https://arjunbala.com/nishthadashboarddemo/NisthaDashboard/Sales/images/auth-bg/Final%20Yantra%20Logo.png" className='h-8'></img></div>
                                </div>

                                <div className="app-navbar flex-shrink-0">

                                    <div className='app-navbar-item ms-1 ms-md-4  text-white flex gap-5 items-center'>

                                        <div className="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px"
                                            data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent"
                                            data-kt-menu-placement="bottom-end">
                                            <i className="ki-duotone ki-element-11 fs-2">
                                                <span className='text-xl'><FullScreenButton /></span>
                                            </i>
                                        </div>
                                    </div>


                                    <div className='app-navbar-item ms-1 ms-md-4  text-white flex gap-5 items-center'>

                                        <div className="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px"
                                            data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent"
                                            data-kt-menu-placement="bottom-end">
                                            <i className="ki-duotone ki-element-11 fs-2">
                                                <button onClick={handleLogout}><span className='text-2xl hover:bg-red-600'><IoIosLogOut /></span></button>
                                            </i>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="app-wrapper flex-row flex-row-fluid" id="kt_app_wrapper">

                        <motion.div animate={
                            isExpanded ? "expanded" : "nonExpanded"
                        } variants={variants} id="kt_app_sidebar" className="app-sidebar w-[20%] bg-black min-h-screen text-slate-400 flex-column">

                            <div className="app-sidebar-menu overflow-hidden flex-column-fluid">

                                <div className="app-sidebar-wrapper">

                                    <div className="mx-3">

                                        <div className="menu menu-column menu-rounded menu-sub-indention flex flex-col gap-5 fw-semibold fs-6"
                                            id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">

                                            <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                                data-kt-menu-placement="right-start"
                                                className="menu-item menu-lg-down-accordion menu-sub-lg-down-indention">
                                                {SideLink.map((item, index) => (
                                                    <div key={index} data-kt-menu-trigger="click" className={`menu-item hover:text-white menu-accordion my-5 ${activeNavIndex === index ? " font-semibold bg-slate-700 text-white rounded-xl" : ""}`}>
                                                        <span className="menu-link" onClick={() => {
                                                            setActiveNavIndex(index);
                                                            navigate(item.link);
                                                        }}>
                                                            <span className="menu-icon">
                                                                <i className="ki-duotone ki-element-7 fs-2">
                                                                    <span className="path1"></span>
                                                                    <span className="path2"></span>
                                                                </i>

                                                            </span>
                                                            <span className="menu-title">{item.name}</span>
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                        <div className='flex flex-col w-full'>
                            <Outlet />
                        </div>
                    </div>
                </div>



                <div id="kt_app_footer" className="app-footer bg-black text-white">

                    <div
                        className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">

                        <div className="text-gray-900 order-2 order-md-1">
                            <span className="text-muted fw-semibold me-1 text-white">2024&copy; Yantra Innovations </span>
                        </div>


                        <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                            <li className="menu-item">
                                <a href="https://www.yantrainnovation.com/#page1" target="_blank" className="menu-link px-2">About</a>
                            </li>
                            <li className="menu-item">
                                <a href="https://www.yantrainnovation.com/#page1" target="_blank"
                                    className="menu-link px-2">Support</a>
                            </li>
                            <li className="menu-item">
                                <a href="https://www.yantrainnovation.com/#page1" target="_blank"
                                    className="menu-link px-2">Purchase</a>
                            </li>
                        </ul>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Layout
