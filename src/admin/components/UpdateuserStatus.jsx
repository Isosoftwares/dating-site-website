import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UpdateuserStatus({ status, closeModal, userId }) {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  const updateFn = (data) => {
    return axios.patch(`/auth/update-status`,data);
  };

  const { isLoading: loadingUpdate, mutate: activateMutate } = useMutation({
    mutationFn: updateFn,
    onSuccess: (response) => {
      const text = response?.data.message;
      toast.success(text);
      queryClient.invalidateQueries([`buyers-`]);
      closeModal();
    },
    onError: (err) => {
      const text = err?.response.data.message || "Something went wrong!!";
      toast.error(text);
    },
  });

  const submit = () => {
    const data = {
      userId: userId,
      userType: "user",
      status: status,
    };
    activateMutate(data);
  };

  return (
    <div>
      <div className=" shadow-xl flex flex-col gap-4">
        <p className="pb-1">
          Are you sure you want to update user status to:{" "}
          <span className="font-bold">{status}</span>?
        </p>
        <div className="flex justify-center  gap-1">
          <button
            className="rounded-md  bg-gray-600 text-white w-[50%] font-bold px-5 py-1 hover:bg-tertiary "
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            disabled={loadingUpdate}
            className="rounded-md disabled:bg-gray-800 disabled:cursor-not-allowed  bg-red-500 text-white font-bold px-5 w-[50%] py-1 hover:bg-tertiary "
            onClick={() => {
              submit();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateuserStatus;
