import React from "react";
import image from "../../assets/failed.jpg";
import { Link } from "react-router-dom";

const Failed = () => {
  return (
    <div className="min-h- flex items-center justify-center ">
      <div className=" text-center">
        <div className="flex justify-center mb-6">
          <div className="">
            <div className="flex items-center justify-center">
              <img src={image} alt="" className="h-[300px]" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Your Payment was cancelled or Failed!
        </h2>
        <p className="text-gray-600 mb-4">
          Unfortunately, your payment was not successful. Please try again or
          contact support if the issue persists.
        </p>
        <Link to="/client/upgrade" className="text-red-500 underline">
          View Upgrade page
        </Link>
      </div>
    </div>
  );
};

export default Failed;
