import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddBusiness({ clientId, closeModal }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addFnc = (data) => {
    return axios.patch("/client/add-business", data);
  };

  const { mutate: addMutate, isPending: loadingAdd, error } = useMutation({
    mutationFn: addFnc,

    onSuccess: (response) => {
      reset();
      const text = response?.data?.message;
      toast.success(text);
      queryClient.invalidateQueries(`client-${clientId}`);
      closeModal();
    },
    onError: (err) => {
      const text = err.response.data.message;
      toast.error(text);
    },
  });

  const onSubmitting = async (data) => {
    data.clientId = clientId;
    addMutate(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmitting)}>
        <p>Business name</p>

        <div>
          <input
            type="text"
            className="input"
            {...register("businessName", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.businessName?.type === "required" &&
              "Business name is required"}
          </p>
        </div>
        {loadingAdd ? (
          <div className="text-center my-3 text-primary ">Please wait...</div>
        ) : (
          <div className="flex justify-center py-3 gap-3 ">
            <button className="secondary-btn">Add Business</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
              className="text-light bg-gray-500 px-4 py-1 rounded-md hover:bg-opacity-80 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddBusiness;
