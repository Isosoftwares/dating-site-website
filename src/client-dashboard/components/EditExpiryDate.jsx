import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

function EditExpiryDate({ clientId, closeModal, businessId, expiryDate }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const editFn = (data) => {
    return axios.patch("/client/edit/subscription", data);
  };

  const { mutate: editMutate, isPending: loadingEdit, error } = useMutation({
    mutationFn: editFn,

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
    data.businessId = businessId;
    data.createdBy = auth?.userId;
    editMutate(data);
  };
  const defaultDate = new Date(expiryDate).toISOString().slice(0, 16);

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmitting)}>
        <p>Expiry date</p>

        <div>
          <input
            type="datetime-local"
            defaultValue={defaultDate}
            className="input"
            {...register("date", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.date?.type === "required" &&
              "Date and time are required"}
          </p>
        </div>
        <div>
          <label htmlFor="">
            Description- optional (can be a reason for the edit)
          </label>
          <textarea
            name=""
            id=""
            className="input"
            {...register("description", {
              required: false,
            })}
          ></textarea>
        </div>
        {loadingEdit ? (
          <div className="text-center my-3 text-primary ">Please wait...</div>
        ) : (
          <div className="flex justify-center py-3 gap-3 ">
            <button className="secondary-btn">Edit Date</button>
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

export default EditExpiryDate;
