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
            <div className="lg:hidden pr-3">
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
                <img src={logo} alt="logo" className="h-10 object-contain " />
              </Link>
            </div>
          </div>
          {/* Links */}
          <div className="hidden lg:flex justify-evenly gap-4 w-full">
            {navLinks.map((item) => {
              if (item?.name === "Activity")
                return (
                  <Menu shadow="md" width={200} trigger="click-hover">
                    <Menu.Target>
                      <div className="flex gap-1 items-center text-light cursor-pointer hover:underline underline-offset-4 ">
                        <p className="text-light ">Activity</p>
                        <p>
                          <FaChevronDown />
                        </p>
                      </div>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item>
                        <Link
                          to={"/client/likes"}
                          className="hover:text-secondary w-full hover:underline flex items-center "
                        >
                          Likes
                        </Link>
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item>
                        <Link
                          to={"/client/profile-views"}
                          className="hover:text-secondary w-full hover:underline flex items-center "
                        >
                          Profile Views
                        </Link>
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item>
                        <Link
                          to={"/client/favorites"}
                          className="hover:text-secondary w-full hover:underline flex items-center "
                        >
                          Favorites
                        </Link>
                      </Menu.Item>
                      <Menu.Divider />
                    </Menu.Dropdown>
                  </Menu>
                );
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
          <div className="flex items-center justify-end gap-3 cursor-pointer mr-3 w-full">
            <Link to={"/client/upgrade"}>
              <button className="bg-light px-6 py-1 rounded-md text-primary hover:px-8 ease-in-out duration-300">
                Upgrade
              </button>
            </Link>
            <Menu shadow="md" width={250}>
              <Menu.Target>
                <Avatar size="lg" radius="xl" src={auth?.imgUrl || avatar} />
              </Menu.Target>
              <Menu.Dropdown>
                <div className="text-sm py-4 bg-primary/90 px-3 text-light">
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
          <div className="fixed inset-0 bg-light px-3 pt-5 text-dark w-80 z-50 shadow-lg overflow-y-auto transition-transform duration-300">
            <div className="border-b-2 border-b-primary flex items-center justify-between pb-1">
              <Link to={"/client/overview"}>
                <img src={logo2} className="h-12 w-[90%]" alt="Logo" />
              </Link>
              <MdClose size={30} color="#00b8a9" onClick={handleMenu} />
            </div>
            <ul className="flex flex-col divide-y-2 font-semibold mt-4">
              {navLinks.map((item) => {
                if (item?.name === "Activity")
                  return (
                    <div>
                      <div
                        onClick={toggle}
                        className="flex items-center justify-between "
                      >
                        <p>Activity</p>
                        <FaChevronDown />
                      </div>
                      <Collapse in={opened}>
                        <div
                          className={`flex flex-col ${
                            opened && "bg-gray-100 rounded-md divide-y-2 "
                          } `}
                        >
                          <Link
                            to={"/client/likes"}
                            className="px-3 py-1 hover:text-dark hover:bg-primary rounded-sm"
                            onClick={handleMenu}
                          >
                            Likes
                          </Link>
                          <Link
                            to={"/client/profile-views"}
                            className="px-3 py-1 hover:text-dark hover:bg-primary rounded-sm"
                            onClick={handleMenu}
                          >
                            Profile Views
                          </Link>
                          <Link
                            to={"/client/favorites"}
                            className="px-3 py-1 hover:text-dark hover:bg-primary rounded-sm"
                            onClick={handleMenu}
                          >
                            Favorites
                          </Link>
                        </div>
                      </Collapse>
                    </div>
                  );
                return (
                  <NavLink
                    to={item.path}
                    key={item.id}
                    className="px-3 py-2 hover:text-dark hover:bg-primary rounded-sm"
                    onClick={handleMenu}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
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
