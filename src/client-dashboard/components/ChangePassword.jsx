import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ChangePassword({ handleCloseModal, userType }) {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const [visiblePassword, setVisiblePassword] = useState(false);

  // password change
  // password form validation rules
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const changePassword = (data) => {
    return axios.patch(`/auth/change-password`, data);
  };

  const {
    mutate: changePassMutate,
    isPending: loadingChangePass,
  } = useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      const text = response?.data?.message;
      toast.success(text);
      handleCloseModal();
      reset();
    },
    onError: (err) => {
      const text = err?.response?.data?.message 
      toast.error(text);
    },
  });

  const handlePasswordChange = (data) => {
    data.userId = auth?.userId;
    data.userType = "client";
    changePassMutate(data);
  };

  //end of password change
  return (
    <div className=" ">
      <p className="font-bold text">Change Account Password</p>
      <div className=" flex flex-col">
        <div className=" mt-3">
          <div className=" theme px-2 rounded-md shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex gap-2 flex-col">
                <div className="mb-5">
                  <h1 className="mb-2">
                    New Password{" "}
                    <span>
                      <sup className="text-red-500">*</sup>
                    </span>
                  </h1>
                  <div
                    className={`  flex gap-3 p-2 border border-gray-300 dark:border-gray-700 rounded-md `}
                  >
                    <input
                      type={visiblePassword ? "text" : "password"}
                      {...register("password")}
                      name="password"
                      placeholder="Enter New Password"
                      className="outline-none theme w-full "
                      disabled={loadingChangePass}
                    />
                    <h1>
                      {visiblePassword ? (
                        <div
                          className="px-2 cursor-pointer mt-2"
                          onClick={() => {
                            setVisiblePassword(!visiblePassword);
                          }}
                        >
                          <AiOutlineEyeInvisible />
                        </div>
                      ) : (
                        <div
                          className="px-2 cursor-pointer mt-2"
                          onClick={() => {
                            setVisiblePassword(!visiblePassword);
                          }}
                        >
                          <AiOutlineEye />
                        </div>
                      )}
                    </h1>
                  </div>
                  <p className="text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                </div>
                <div className="mb-5">
                  <h1 className="mb-2">
                    Confirm Password{" "}
                    <span>
                      <sup className="text-red-500">*</sup>
                    </span>{" "}
                  </h1>
                  <div
                    className={`  flex gap-3 p-2 border border-gray-300 dark:border-gray-700 rounded-md `}
                  >
                    <input
                      type={visiblePassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      name="confirmPassword"
                      placeholder="Repeat New Password"
                      className={`outline-none w-full theme disabled:bg-gray-200 `}
                      disabled={loadingChangePass}
                    />
                    <h1>
                      {visiblePassword ? (
                        <div
                          className="px-2 cursor-pointer mt-2"
                          onClick={() => {
                            setVisiblePassword(!visiblePassword);
                          }}
                        >
                          <AiOutlineEyeInvisible />
                        </div>
                      ) : (
                        <div
                          className="px-2 cursor-pointer mt-2"
                          onClick={() => {
                            setVisiblePassword(!visiblePassword);
                          }}
                        >
                          <AiOutlineEye />
                        </div>
                      )}
                    </h1>
                  </div>
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
                <div className="my-5 flex justify-center">
                  <button
                    disabled={loadingChangePass}
                    onClick={handleSubmit(handlePasswordChange)}
                    className={` bg-primary rounded-md text-white   bg-opacity-100 hover:bg-opacity-80 cursor-pointer  duration-300   px-4 py-2 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-opacity-70 `}
                  >
                    {loadingChangePass ? "Updating" : "Change password"}
                    {loadingChangePass ? (
                      <Loader color="white" size={22} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
