import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function AddClientBalance({ clientId, closeModal }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addBalFnc = (data) => {
    return axios.post("/payments/deposit", data);
  };

  const { mutate: addMutate, isPending: loadingAdd, error } = useMutation({
    mutationFn: addBalFnc,

    onSuccess: (response) => {
      reset();
      const text = response?.data?.message;
      toast.success(text);
      queryClient.invalidateQueries(`client-${clientId}`);
      closeModal();
    },
    onError: (err) => {
        console.log(err);
      const text = err.response.data.message;
      toast.error(text);
    },
  });

  const onSubmitting = async (data) => {
    data.clientId = clientId;
    data.createdBy = auth?.userId;
    addMutate(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmitting)}>
        <p>Amount (ksh)</p>

        <div>
          <input
            type="number"
            min={1}
            className="input"
            {...register("amount", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.amount?.type === "required" && "Amount is required"}
          </p>
        </div>
        <div>
          <label htmlFor="">Description</label>
          <textarea
            className="input"
            name=""
            id=""
            {...register("description", {
              required: true,
            })}
          ></textarea>

          <p className="text-red-500 text-xs mt-1">
            {errors.description?.type === "required" && "Add some description"}
          </p>
        </div>
        {loadingAdd ? (
          <div className="text-center my-3 text-primary ">Please wait...</div>
        ) : (
          <div className="flex justify-center py-3 gap-3 ">
            <button className="secondary-btn">Deposit</button>
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

export default AddClientBalance;
