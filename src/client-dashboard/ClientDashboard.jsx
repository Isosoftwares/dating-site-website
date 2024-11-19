import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { MdMenu, MdClose } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { Avatar, Collapse, Menu } from "@mantine/core";
import { PiPasswordBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";
import { MdOutlineSupportAgent } from "react-icons/md";
import logo from "../assets/logow2.png";
import logo2 from "../assets/logo5.png";
import avatar from "../assets/avatar.png";
import Footer from "../components/Footer/Footer";
import { FaChevronDown } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
function ClientDashboard() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);

  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { id: 1, name: "Online", path: "/client/online" },
    { id: 2, name: "Messages", path: "/client/messages" },
    { id: 3, name: "Profile", path: "/client/Profile" },
    { id: 4, name: "Activity", path: "/client/activity" },
  ];

  // Toggle sticky class on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="w-full overflow-y-auto">
        {/* <div className="py-20"></div> */}

        {/* Navbar */}
        <div
          className={`flex justify-between items-center px-3 pt-1 pb-1  z-30 ${
            isSticky
              ? "bg-primary shadow-lg fixed top-0 ease-in-out duration-200 left-0 w-full"
              : "bg-primary"
          }`}
        >
          <div className="flex items-center w-full">
            <div className="pr-3 lg:hidden">
              {mobileMenu ? (
                <div onClick={handleMenu}>
                  <MdClose size={30} color="#fff" />
                </div>
              ) : (
                <div onClick={handleMenu}>
                  <MdMenu size={30} color="#fff" />
                </div>
              )}
            </div>
            <div>
              <Link to={"/client/overview"}>
                <img src={logo} alt="logo" className="object-contain h-10 " />
              </Link>
            </div>
          </div>
          {/* Links */}
          <div className="hidden w-full gap-4 lg:flex justify-evenly">
            {navLinks.map((item) => {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className="text-light hover:underline hover:underline-offset-4"
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
          {/* Profile */}
          <div className="flex items-center justify-end w-full gap-3 mr-3 cursor-pointer">
            <Link to={"/client/subscription"}>
              <button className="px-6 py-1 duration-300 ease-in-out rounded-md bg-light text-primary hover:px-8">
                Upgrade
              </button>
            </Link>
            <Menu shadow="md" width={250}>
              <Menu.Target>
                <Avatar size="lg" radius="xl" src={auth?.imgUrl || avatar} />
              </Menu.Target>
              <Menu.Dropdown>
                <div className="px-3 py-4 text-sm bg-primary/90 text-light">
                  User: {auth?.userName}
                </div>
                <Menu.Item>
                  <Link
                    to={"/client/support"}
                    className="flex items-center gap-2 border-b"
                  >
                    <MdOutlineSupportAgent />
                    <p>My Membership</p>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to={"/client/change-password"}
                    className="flex items-center gap-2 border-b"
                  >
                    <PiPasswordBold />
                    <p>Change Password</p>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <div onClick={signOut} className="flex items-center gap-2">
                    <BiLogOut />
                    <p>Logout</p>
                  </div>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="fixed inset-0 z-50 px-3 pt-5 overflow-y-auto transition-transform duration-300 shadow-lg bg-light text-dark w-80">
            <div className="flex items-center justify-between pb-1 border-b-2 border-b-primary">
              <Link to={"/client/overview"}>
                <img src={logo2} className="h-12 w-[90%]" alt="Logo" />
              </Link>
              <MdClose size={30} color="#00b8a9" onClick={handleMenu} />
            </div>
            <ul className="flex flex-col mt-4 font-semibold divide-y-2">
              {navLinks.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.id}
                  className="px-3 py-2 rounded-sm hover:text-dark hover:bg-primary"
                  onClick={handleMenu}
                >
                  {item.name}
                </NavLink>
              ))}
            </ul>
          </div>
        )}

        <main
          onClick={() => {
            if (mobileMenu) setMobileMenu(false);
          }}
          className="min-h-[150vh] overflow-y-auto"
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ClientDashboard;
