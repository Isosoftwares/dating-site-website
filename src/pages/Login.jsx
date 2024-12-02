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

  const toDash = location.state?.from?.pathname || "/dashboard/overview";
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
        imgUrl,
        favorites = []
      } = response?.data;
      setAuth({ roles, accessToken, userId, userName, email, imgUrl, favorites });
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
      // console.log(err);
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
          <h2 className="mb-6 text-2xl font-semibold text-center text-light">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmitting)} className="space-y-1">
            <div>
              <label className="block mb-1 font-medium text-light">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 border rounded-md appearance-none bg-gray-50/10 text-gray-50 focus:outline-none focus:border-primary focus:dark:border-primary border-primary disabled:cursor-not-allowed"
              />
              {errors?.email?.type === "required" && (
                <p className="mt-1 text-sm text-red-500">Email is required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-light">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                  })}
                  className="w-full px-4 py-2 border rounded-md appearance-none bg-gray-50/10 text-gray-50 focus:outline-none focus:border-primary focus:dark:border-primary border-primary disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors?.password?.type === "required" && (
                <p className="mt-1 text-sm text-red-500">
                  Password is required
                </p>
              )}
            </div>
            <div className="py-5">
              <button
                type="submit"
                className="w-full py-2 text-white transition duration-150 rounded-lg bg-primary hover:bg-primary-dark"
                disabled={loginLoading}
              >
                {loginLoading ? <Loader size="sm" color="white" /> : "Login"}
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-50">
                Not a member?{" "}
                <Link to="/sign-up" className="text-lg font-bold text-primary">
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
