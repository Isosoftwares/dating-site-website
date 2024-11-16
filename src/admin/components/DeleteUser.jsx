import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function DeleteUser({ deleteUserId, closeModal }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();

  const deleteUser = () => {
    return axios.delete(`/users/delete/client/${deleteUserId}`);
  };
  const { isPending: isDeleting, mutate: deleteusermutate } = useMutation({
    mutationFn: deleteUser,
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
  return (
    <div>
      {" "}
      <div className=" shadow-xl flex flex-col gap-4">
        <p className="pb-1">Are you sure you want to delete this Buyer?</p>
        <div className="flex justify-center  gap-1">
          <button
            className="rounded-md  bg-gray-600 text-white w-[50%] font-bold px-5 py-1 hover:bg-tertiary "
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            className="rounded-md disabled:bg-gray-800 disabled:cursor-not-allowed  bg-red-500 text-white font-bold px-5 w-[50%] py-1 hover:bg-tertiary "
            onClick={() => {
              deleteusermutate();
              closeModal();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
