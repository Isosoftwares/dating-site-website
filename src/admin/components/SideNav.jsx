import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdDashboard, MdOutlinePayment, MdClose } from "react-icons/md";
import Logo from "../../assets/logo1.png";
import logo2 from "../../assets/logo1.png";
import { RiLockPasswordFill } from "react-icons/ri";
function SideNav({ mobileMenu, handleMenu }) {
  const location = useLocation();
  const { pathname } = location;

  const navItems = [
    {
      name: "Home",
      links: [
        {
          name: "Clients",
          path: "/dashboard/clients",
          icon: <MdDashboard size={18} />,
        },
      ],
    },
    {
      name: "My Account",
      links: [
        {
          name: "Payments",
          path: "/dashboard/payments",
          icon: <MdOutlinePayment size={18} />,
        },
        {
          name: "Account",
          path: "/dashboard/account",
          icon: <RiLockPasswordFill size={18} />,
        },
      ],
    },
  ];
  const theme = localStorage.getItem("theme");

  return (
    <div>
      <div
        className={`theme h-screen  no-scrollbar  hidden lg:inline-block  text-dark   z-50   w-80  overflow-y-auto shadow-md   `}
      >
        <div className=" py-[14px] mb-4 border-b-2 border-b-secondary ">
          <Link to={"/"} className="  ">
            <img
              src={theme === "light" ? Logo : logo2}
              alt=""
              className="h-[80px] "
            />
          </Link>
        </div>
        <div className="px-2">
          <ul className="flex flex-col  gap-3  font-semibold text-opacity-100  ">
            {navItems?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    handleMenu();
                  }}
                >
                  <div>
                    <div className="pl-1 ">
                      {item?.links?.map((item, index) => {
                        return (
                          <Link
                            to={item?.path}
                            state={{ path: item.name }}
                            key={index}
                            className={` ${
                              pathname?.includes(item.path) &&
                              "dark:bg-secondary/20 bg-secondary/50 text rounded-md shadow-md shadow-primary/10 "
                            } flex gap-2 mt-1 text-dark dark:text-light items-center px-4 py-2 dark:hover:bg-secondary/20 hover:bg-secondary/50 hover:text  hover:rounded-md `}
                          >
                            {item?.icon}
                            <p>{item.name}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`${
          mobileMenu
            ? "translate-x-0 z-50 dark:bg-dark dark:text-light bg-[#fff] shadow-md shadow-tertiary  h-screen fixed lg:hidden  text-dark  z-60   w-72  overflow-y-auto no-scrollbar transition-transform duration-300  "
            : "hidden"
        }`}
      >
        <div className=" py-5 mb-4 border-b-2 border-b-secondary flex justify-between items-center gap-3 px-2">
          <Link to={"/"} className="  ">
            <img
              src={theme === "light" ? Logo : logo2}
              alt=""
              className="h-[70px] "
            />
          </Link>
          <div
            onClick={(e) => {
              handleMenu();
            }}
          >
            <MdClose size={30} color={` `} className="text" />
          </div>
        </div>
        <div className="px-2 h-[80vh] overflow-y-auto no-scrollbar pb-5">
          <ul className="flex flex-col  gap-3  font-semibold text-opacity-100  ">
            {navItems?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    handleMenu();
                  }}
                >
                  <div>
                    <div className="pl-1 ">
                      {item?.links?.map((item, index) => {
                        return (
                          <Link
                            to={item?.path}
                            state={{ path: item.name }}
                            key={index}
                            className={`${
                              pathname?.includes(item.path) &&
                              "dark:bg-secondary/20 bg-secondary/50 text rounded-md shadow-md shadow-primary/10 "
                            } flex gap-2 mt-1 text-dark dark:text-light  items-center px-4 py-2 hover:bg-tertiary hover:bg-secondary/50 hover:rounded-md `}
                          >
                            {item?.icon}
                            <p>{item.name}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
