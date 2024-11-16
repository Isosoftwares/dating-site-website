import React, { useEffect, useState } from "react";
import Logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import whatsappNumber from "../utils/whatsappNumber";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer/Footer";
import { IoMan } from "react-icons/io5";
import { IoWoman } from "react-icons/io5";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setgender] = useState("");
  const [lookingForGender, setLookingForGender] = useState("");

  const [location, setLocation] = useState({
    country: "",
    city: "",
    town: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const signUp = (data) => {
    return axios.post("/user", data);
  };

  const { mutate: signupMutate, isPending: loadingSignup, error } = useMutation(
    {
      mutationFn: signUp,

      onSuccess: (response) => {
        reset();
        const text = response?.data?.message;
        toast.success(text);
        navigate("/login");
      },
      onError: (err) => {
        const text = err.response.data.message;
        toast.error(text);
      },
    }
  );
  const date = new Date();
  const year = date.getFullYear();

  const onSubmitting = async (data) => {
    if (!gender) return toast.error("Please select your gender!");
    data.gender = gender;
    data.interestedInGender = lookingForGender;
    data.dob = year - data.age;
    signupMutate(data);
  };

  useEffect(() => {
    const fetchIPBasedLocation = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json/`);
        if (!response.ok) throw new Error("Failed to fetch IP location data.");
        const data = await response.json();
        setLocation({
          country: data.country_name,
          city: data.region,
          town: data.city,
        });
        setValue("country", data.country_name);
        setValue("city", data.region);
        setValue("town", data.city);
      } catch (err) {
        setError("Failed to fetch location data.");
      }
    };
    fetchIPBasedLocation();
  }, [setValue]);

  return (
    <div className=" min-h-[100vh] bg-login  bg-center bg-[#56717a] bg-blend-overlay ">
      <div className=" bg-gradient-to-b md:bg-gradient-to-r from-[#14151d] overflow-auto bg-opacity-30 min-h-screen  ">
        <NavBar />
        <div className=" px-4 py-2  bg-light/5 min-h-[70vh] md:mx-4 rounded-lg w-full md:max-w-[50%] lg:max-w-[40%]  text-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold text-light text-center">
            Sign up
          </h2>

          <form onSubmit={handleSubmit(onSubmitting)} className="">
            <div>
              <label className="block text-light font-medium mb-1">Name</label>
              <input
                type="text"
                {...register("userName", { required: true })}
                className="bg-gray-50/10 text-gray-50   focus:outline-none focus:border-primary focus:dark:border-primary border  border-primary   rounded-md py-2 px-4  w-full appearance-none disabled:cursor-not-allowed"
              />
              {errors?.userName?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-light">I'm a</p>
                <div className="text-light flex gap-2 ">
                  <span
                    onClick={() => {
                      setgender("male");
                      setLookingForGender("female");
                    }}
                    className={` ${
                      gender === "male" && "bg-blue-700/70 "
                    }  p-4 border  rounded-md cursor-pointer  `}
                  >
                    <IoMan size={30} />
                  </span>
                  <span
                    onClick={() => {
                      setgender("female");
                      setLookingForGender("male");
                    }}
                    className={` ${
                      gender === "female" && "bg-pink-700/70 "
                    }  p-4 border  rounded-md cursor-pointer  `}
                  >
                    <IoWoman size={30} />
                  </span>
                </div>
              </div>
              <div>
                <p className="text-light">Looking for</p>
                <div className="text-light flex gap-2 ">
                  <span
                    onClick={() => {
                      setLookingForGender("male");
                    }}
                    className={` ${
                      lookingForGender === "male" && "bg-blue-700/70 "
                    }  p-4 border  rounded-md cursor-pointer  `}
                  >
                    <IoMan size={30} />
                  </span>
                  <span
                    onClick={() => {
                      setLookingForGender("female");
                    }}
                    className={` ${
                      lookingForGender === "female" && "bg-pink-700/70 "
                    }  p-4 border  rounded-md cursor-pointer  `}
                  >
                    <IoWoman size={30} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-light font-medium mb-1">Age</label>
              <input
                type="text"
                {...register("age", { required: true })}
                className="bg-gray-50/10 text-gray-50   focus:outline-none focus:border-primary focus:dark:border-primary border  border-primary   rounded-md py-2 px-4  w-full appearance-none disabled:cursor-not-allowed"
              />
              {errors?.age?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Age is required</p>
              )}
            </div>
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
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    {...register("terms", {
                      required: true,
                    })}
                  />
                  <span className="ml-2 text-light">
                    Yes, I confirm that I am over 18 and agree to the{" "}
                    <span className="font-bold">
                      <Link to={"/terms"} className="underline">
                        Terms of useage{" "}
                      </Link>
                    </span>
                    and{" "}
                    <span className="font-bold">
                      <Link to={"/policies"} className="underline">
                        Privacy policy
                      </Link>
                    </span>
                  </span>
                </label>
                <p className="text-red-500 text-xs mt-1">
                  {errors.terms?.type === "required" &&
                    "Accept terms and conditions to continue"}
                </p>
              </div>
            </div>
            <div className="py-5">
              <button
                type="submit"
                className="w-full bg-primary font-bold hover:bg-primary-dark text-white py-2 rounded-lg transition duration-150"
                disabled={loadingSignup}
              >
                {loadingSignup ? (
                  <div>
                    Please wait...
                    <Loader color="white" size="sm" />
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-50">
                Already a member?{" "}
                <Link to="/login" className="text-primary text-lg font-bold">
                  Login!
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

export default SignUp;
