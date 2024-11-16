import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo2 from "../../assets/logo5.png";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="bg-light text-white">
      {/*  */}
      <div className="border-t border-t-gray-900 bg-gray-800">
        <div className="flex flex-col px-3 md:px-[60px] justify-between pt-5 py-4  lg:flex-row">
          <div className="flex  gap-4 md:items-center flex-col md:flex-row">
            <img src={logo2} alt="" className="h-10 object-contain " />
            <p className="text-sm text-center md:text-start text-gray-200">
              © Copyright {year} All rights reserved.
            </p>
          </div>
          <ul className="flex  mb-3   items-center gap-2 flex-row">
            <li>
              <Link to={'/terms'}>Terms and Conditions</Link>
            </li>
            <li>
              <Link to={'/policies'}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
