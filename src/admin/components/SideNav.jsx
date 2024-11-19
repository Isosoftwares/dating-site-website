import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdDashboard, MdOutlinePayment, MdClose } from "react-icons/md";
import Logo from "../../assets/logo5.png";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUsersGear } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";

function SideNav({ mobileMenu, handleMenu }) {
  const location = useLocation();
  const { pathname } = location;

  const navItems = [
    {
      name: "Home",
      links: [
        {
          name: "Overview",
          path: "/dashboard/overview",
          icon: <MdDashboard size={18} />,
        },
      ],
    },
    {
      name: "Users",
      links: [
        {
          name: "Users",
          path: "/dashboard/clients",
          icon: <FaUsersGear size={18} />,
        },
        {
          name: "User Subscriptions",
          path: "/dashboard/client-subscriptions",
          icon: <FaCreditCard size={18} />,
        },
      ],
    },
    {
      name: "My Account",
      links: [
        {
          name: "Manage subscriptions",
          path: "/dashboard/manage-subscriptions",
          icon: <FaCreditCard size={18} />,
        },
        {
          name: "Account",
          path: "/dashboard/account",
          icon: <RiLockPasswordFill size={18} />,
        },
      ],
    },
  ];

  return (
    <div>
      <div
        className={`h-screen  no-scrollbar  hidden lg:inline-block  text-dark  bg-light z-50   w-80  overflow-y-auto shadow-md  `}
      >
        <div className=" py-[14px] mb-4 border-b-2 border-b-secondary ">
          <Link to={"/"} className="  ">
            <img src={Logo} alt="" className="h-12 object-cover w-full " />
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
                              " bg-primary/50 text rounded-md shadow-sm shadow-primary/50 "
                            } flex gap-2 mt-1  items-center px-4 py-2 text-gray-700  hover:bg-primary/50 hover:text  hover:rounded-md `}
                          >
                            {item?.icon}
                            <p className="font-bold">{item.name}</p>
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
            ? "translate-x-0 z-50  bg-[#fff] shadow-md shadow-tertiary  h-screen fixed lg:hidden  z-60   w-72  overflow-y-auto no-scrollbar transition-transform duration-300  "
            : "hidden"
        }`}
      >
        <div className=" py-5 mb-4 border-b-2 border-b-secondary flex justify-between items-center gap-3 px-2">
          <Link to={"/dashboard"} className="  ">
            <img src={Logo} alt="" className="h-10  object-cover w-full " />
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
                              " bg-primary/50 text rounded-md shadow-md shadow-primary/10 "
                            } flex gap-2 mt-1   items-center px-4 py-2 text-gray-700 hover:bg-tertiary hover:bg-secondary/50 hover:rounded-md `}
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
