import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function EditSubscriptionAmount({ clientId, closeModal, subscriptionAmount }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const editFnc = (data) => {
    return axios.patch("/client/edit-subscription/amount", data);
  };

  const { mutate: editMutate, isPending: loadingEdit, error } = useMutation({
    mutationFn: editFnc,

    onSuccess: (response) => {
      reset();
      const text = response?.data?.message;
      toast.success(text);
      queryClient.invalidateQueries(`client-${clientId}`);
      closeModal();
    },
    onError: (err) => {
      const text = err.response.data.message || "Something went wrong!";
      toast.error(text);
    },
  });

  const onSubmitting = async (data) => {
    data.clientId = clientId;
    editMutate(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmitting)}>
        <p>
          Current Subscription amount:{" "}
          <span className="font-bold">ksh {subscriptionAmount}</span>{" "}
        </p>

        <div>
          <label className="text-sm" htmlFor="">
            New Amount
          </label>
          <input
            type="number"
            min={1}
            className="input"
            defaultValue={subscriptionAmount}
            {...register("amount", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.amount?.type === "required" && " New Amount is required"}
          </p>
        </div>
        {loadingEdit ? (
          <div className="text-center my-3 text-primary ">Please wait...</div>
        ) : (
          <div className="flex justify-center py-3 gap-3 ">
            <button className="secondary-btn">Edit Amount</button>
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

export default EditSubscriptionAmount;
