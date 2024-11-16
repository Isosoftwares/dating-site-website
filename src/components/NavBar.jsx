import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo5.png";
import { MdMenu, MdClose } from "react-icons/md";

export default function NavBar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    {
      name: "Privacy Policy ",
      path: "/terms",
    },
    {
      name: "Terms Of service ",
      path: "/policies",
    },
  ];

  return (
    <div>
      {" "}
      {/* nav */}
      <div className="flex justify-between px-4 bg-light bg-opacity-0 items-center pt-2 w-full ">
        <div className=" w-full">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
        <div className="text-light  hidden lg:flex justify-end w-full">
          {navLinks?.map((item, index) => {
            return (
              <NavLink
                key={index}
                className="underline underline-offset-4 mx-3 "
                to={item?.path}
              >
                {item?.name}
              </NavLink>
            );
          })}
        </div>
        {/* toggle */}
        <div className="lg:hidden pr-3">
          {mobileMenu ? (
            <div
              onClick={(e) => {
                setMobileMenu(!mobileMenu);
              }}
            >
              <MdClose size={30} color="#00b8a9" />
            </div>
          ) : (
            <div
              onClick={(e) => {
                setMobileMenu(!mobileMenu);
              }}
            >
              <MdMenu size={30} color="#00b8a9" />
            </div>
          )}
        </div>
        {/* mobile menu */}
        <div
          className={`${mobileMenu ? "translate-x-0 " : " -translate-x-80"}
             bg-light px-3 pt-5  text-dark fixed inset-0 z-50 lg:hidden  w-72  overflow-y-auto no-scrollbar transition-transform duration-300 xl:translate-x-0 `}
        >
          <div className="border-b-2 border--b-primary flex items-center justify-between">
            <img src={Logo} className="h-12 w-[90%] " alt="Logo" />
            <div
              onClick={(e) => {
                setMobileMenu(!mobileMenu);
              }}
            >
              <MdClose size={30} color="#00b8a9" />
            </div>
          </div>
          <ul className="flex flex-col  gap-2  font-semibold text-opacity-100  ">
            {navLinks?.map((item, index) => {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={` px-3 py-2 active:text-secondary custom-hover hover:text-secondary rounded-sm `}
                  onClick={(e) => {
                    setMobileMenu(!mobileMenu);
                  }}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
