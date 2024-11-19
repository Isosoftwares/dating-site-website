import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { MdMenu, MdClose } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import SideNav from "./components/SideNav";
import { Button, Indicator, Menu } from "@mantine/core";
import { PiPasswordBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";
import { MdNotifications } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

function AdminDashboard({}) {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [
    openedDrawer,
    { open: openDrawer, close: closeDrawer },
  ] = useDisclosure(false);

  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="">
      <div className="flex ">
        <SideNav mobileMenu={mobileMenu} handleMenu={handleMenu} />

        <div
          className="w-full overflow-y-auto relative"
          onClick={() => {
            if (mobileMenu) setMobileMenu(false);
          }}
        >
          <div className="flex absolute z-30 top-0 right-0 left-0   bg-light   shadow-sm  justify-between items-center px-3 py-3">
            <div className="flex ">
              <div className="lg:hidden pr-3">
                {mobileMenu ? (
                  <div onClick={handleMenu}>
                    <MdClose size={30} color={` `} className="text" />
                  </div>
                ) : (
                  <div onClick={handleMenu}>
                    <MdMenu size={30} color={` `} className="text" />
                  </div>
                )}
              </div>
              <div className="hidden md:inline-block ">
                <p className="font-bold">
                  Hello,{" "}
                  <span className="capitalize font-bold ">
                    {auth?.userName || "User"}
                  </span>{" "}
                  welcome back!
                </p>
                <p className="font-bold text-sm text-secondary">
                  {state?.path}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 cursor-pointer mr-3 ">
              <div className="flex items-center gap-6 "></div>
              <Menu shadow="md" width={250} classNames="mr-3 bg-gray-700">
                <Menu.Target>
                  <Button color="#00712D">
                    {`${auth?.userName?.substring(0, 10)}...`}
                    <FaAngleDown />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <div className="text-sm py-4 bg-primary/90 px-3 text-light">
                    Admin: {auth?.userName}
                  </div>
                  <Menu.Item>
                    <Link
                      to={"/dashboard/account"}
                      className="flex items-center gap-2 text border-b "
                    >
                      <PiPasswordBold />
                      <p>Account</p>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      onClick={signOut}
                      className="flex items-center gap-2 text"
                    >
                      <BiLogOut />
                      <p>Logout</p>
                    </div>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>

          <main className="h-[100vh] overflow-y-auto no-scrollbar pt-[90px] px-2 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
