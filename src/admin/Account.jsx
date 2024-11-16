import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Divider, Loader, Modal, Skeleton } from "@mantine/core";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import ChangePasswordAdmin from "./components/ChangePasswordAdmin";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

function Account() {
  const [editDetails, setEditDetails] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const { auth } = useAuth();
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // get user
  const getUser = async () => {
    return await axios.get(`/users/account/admin/${auth?.userId}`);
  };

  const {
    isLoading: loadingUser,
    data: userData,
    refetch: refetcUser,
    isRefetching: refetchingUser,
  } = useQuery({
    queryFn: getUser,
    queryKey: [`user-${auth?.userId}`],
    keepPreviousData: true,
  });

  // edit user
  const editFn = (data) => {
    return axios.patch("/users/edit/user-details", data);
  };

  const { mutate: editMutate, isPending: loadingEdit, error } = useMutation({
    mutationFn: editFn,
    onSuccess: (response) => {
      reset();
      const text = response.data.message;
      toast.success(text);
      setEditDetails(false);
      queryClient.invalidateQueries([`user-${auth?.userId}`]);
    },
    onError: (err) => {
      const text = err?.response.data.message || "Something went wrong";
      toast.error(text);
    },
  });

  const onSubmitting = async (data) => {
    data.userId = auth?.userId;
    data.userType = "admin";
    editMutate(data);
  };
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className=" flex flex-col md:flex-row gap-4  ">
      <Modal opened={opened} onClose={close} title="Change password" centered>
        <ChangePasswordAdmin handleCloseModal={close} userType={"user"} />
      </Modal>
      <Skeleton visible={loadingUser}>
        <div className="bg-white dark:bg-dark dark:border-gray-800 dark:text-light overflow-hidden shadow rounded-lg border w-full">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-bold dark:text-light text">
                Profile Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-700 dark:text-light">
                Join date:{" "}
                <span className="text mt-1 max-w-2xl text-sm">
                  {userData?.data?.createdAt?.split("T")[0]}
                </span>
              </p>
            </div>
            <div>
              <button
                className={` ${
                  editDetails && "hidden"
                } bg-secondary px-4 text-light py-1 rounded-md  `}
                onClick={() => {
                  setEditDetails(true);
                }}
              >
                Edit Details
              </button>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit(onSubmitting)}>
            <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-800 ">
                <div className="py-3 sm:py-5 flex sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium w-full text">User name</dt>
                  {editDetails ? (
                    <div className="w-full">
                      <input
                        defaultValue={userData?.data?.name}
                        className={`input`}
                        type="text"
                        placeholder="Enter username"
                        {...register("name", {
                          required: false,
                        })}
                      />
                      <p className="text-red-500 text-xs">
                        {errors.name?.type === "required" &&
                          "Username is required"}
                      </p>
                    </div>
                  ) : (
                    <dd className="mt-1 text-sm text w-full sm:mt-0 sm:col-span-2">
                      {userData?.data?.name || "N/A"}
                    </dd>
                  )}
                </div>
                <div className="py-3 sm:py-5 flex  sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium w-full text">
                    Email address
                  </dt>
                  {editDetails ? (
                    <div className="w-full">
                      <input
                        defaultValue={userData?.data?.email}
                        className={`input`}
                        type="email"
                        placeholder="Enter email"
                        {...register("email", {
                          required: true,
                        })}
                      />
                      <p className="text-red-500 text-xs">
                        {errors.email?.type === "required" &&
                          "Email is required"}
                      </p>
                    </div>
                  ) : (
                    <dd className="mt-1 text-sm text w-full sm:mt-0 sm:col-span-2">
                      {userData?.data?.email}
                    </dd>
                  )}
                </div>
                <div className="py-3 sm:py-5 flex  sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium w-full text">Phone No</dt>
                  {editDetails ? (
                    <div className="w-full">
                      <input
                        defaultValue={userData?.data?.phoneNo}
                        className={`input`}
                        type="number"
                        placeholder="Enter phone no"
                        {...register("phoneNo", {
                          required: true,
                        })}
                      />
                      <p className="text-red-500 text-xs">
                        {errors.email?.type === "required" &&
                          "Phone number is required"}
                      </p>
                    </div>
                  ) : (
                    <dd className="mt-1 text-sm text w-full sm:mt-0 sm:col-span-2">
                      {userData?.data?.phoneNo}
                    </dd>
                  )}
                </div>
              </dl>
              {/* buttons */}
              {loadingEdit ? (
                <p className="text-center my-4 text-green-600 ">
                  Saving Please wait...{" "}
                </p>
              ) : (
                <div
                  className={` ${
                    !editDetails && "hidden"
                  } flex justify-center items-center gap-2 my-5  `}
                >
                  <button className="bg-primary text-light px-4 py-1 rounded-md  ">
                    Save Changes
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setEditDetails(!editDetails);
                    }}
                    className="bg-gray-600 text-light px-4 py-1 rounded-md  "
                  >
                    Cancel Editing
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </Skeleton>

      {/* edit password */}
      <div className=" w-full border bg-white dark:bg-dark shadow rounded-lg dark:border-gray-800 ">
        <div className=" dark:text-light dark:border-none overflow-hidden  min-h-[230px]  border p-2 ">
          <p>Actions</p>
          <Divider />
          <div className="flex justify-start items-center gap-2 my-5 ">
            <button className="primary-btn   " onClick={open}>
              Change Password
            </button>
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-red-400 text-light px-4 py-1 rounded-md  "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
