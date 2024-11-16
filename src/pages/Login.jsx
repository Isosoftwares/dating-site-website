import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Loader } from "@mantine/core";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer/Footer";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toDash = location.state?.from?.pathname || "/dashboard/clients";
  const toClient = location.state?.from?.pathname || "/client/overview";

  // Mutation for login
  const { mutate: loginMutate, isPending: loginLoading } = useMutation({
    mutationFn: (loginData) => axios.post("/auth/login", loginData),
    onSuccess: (response) => {
      const {
        accessToken,
        roles,
        user_Id: userId,
        userName: userName,
        email,
        imgUrl

      } = response?.data;
      setAuth({ roles, accessToken, userId, userName, email, imgUrl });

      localStorage.setItem("userId", JSON.stringify(userId));
      const text = `Welcome back ${userName || ""}`;
      if (roles?.includes("Client")) {
        toast.success(text);
        navigate(toClient, { replace: true });
        reset();
      } else if (roles?.includes("Admin") || roles?.includes("Manager")) {
        toast.success(text);
        navigate(toDash, { replace: true });
        reset();
      }
    },
    onError: (err) => {
      console.log(err);
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });

  const onSubmitting = (data) => {
    loginMutate(data);
  };

  return (
    <div className=" min-h-screen bg-login  bg-center bg-[#56717a] bg-blend-overlay ">
      <div className=" bg-gradient-to-b md:bg-gradient-to-r from-[#14151d] bg-opacity-30 min-h-screen  ">
        <NavBar />
        <div className=" p-4 mdp-8 bg-light/5 h-[70vh] mt-10 md:mx-4 rounded-lg w-full md:max-w-[50%] lg:max-w-[40%]  text-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold text-light text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmitting)} className="space-y-1">
            <div>
              <label className="block text-light font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="bg-gray-50/10 text-gray-50   focus:outline-none focus:border-primary focus:dark:border-primary border  border-primary   rounded-md py-2 px-4  w-full appearance-none disabled:cursor-not-allowed"
              />
              {errors?.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-light font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                  })}
                  className="bg-gray-50/10 text-gray-50   focus:outline-none focus:border-primary focus:dark:border-primary border  border-primary   rounded-md py-2 px-4  w-full appearance-none disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors?.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>
            <div className="py-5">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition duration-150"
                disabled={loginLoading}
              >
                {loginLoading ? <Loader size="sm" color="white" /> : "Login"}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-50">
                Not a member?{" "}
                <Link to="/sign-up" className="text-primary font-bold text-lg">
                  Join Now!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
