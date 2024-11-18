import { Loader } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

function RemoveOnePhoto({ userId, filePath, closeModal }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();

  const removeFn = (data) => {
    return axios.patch("/user/delete/image", data);
  };

  const { mutate: removeMutate, isPending: loadingRemove, error } = useMutation(
    {
      mutationFn: removeFn,

      onSuccess: (response) => {
        const text = response?.data?.message;
        toast.success(text);
        queryClient.invalidateQueries(`user-${userId}`);
        closeModal();
      },
      onError: (err) => {
        const text = err.response.data.message;
        toast.error(text);
      },
    }
  );

  return (
    <div>
      <p className="font-bold text-amber-800">Are you sure you want to remove this photo?</p>
      <div>
        <div className="flex justify-center items-center pt-6">
          {loadingRemove ? (
            <div>
              <Loader color="blue" />
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                removeMutate({filePath,userId})
                }}
                disabled={loadingRemove}
                className={` bg-[#AE445A] hover:bg-dark-700 hover:text-light                    
                 text-white font-bold py-2 px-4 rounded`}
              >
                Yes, Remove
              </button>

              <button
                onClick={() => {
                  closeModal();
                }}
                className="bg-gray-500 hover:bg-dark-700 hover:text-light text-white font-bold py-2 px-4 rounded"
              >
                No, Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RemoveOnePhoto;
