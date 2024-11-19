import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Checkbox } from "@mantine/core";

function EditSubscription({ handleClose, subscription }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const [recommended, setRecommended] = useState(subscription?.recommended);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const EditSubscriptionFn = (data) => {
    return axios.patch("/subscriptions", data);
  };

  const {
    mutate: subscriptionMutate,
    isPending: loadingSubscription,
    error,
  } = useMutation({
    mutationFn: EditSubscriptionFn,
    onSuccess: (response) => {
      reset();
      const text = response.data.message;
      toast.success(text);
      queryClient.invalidateQueries([`subscriptions`]);
      handleClose();
    },
    onError: (err) => {
      const text = err?.response.data.message || "Something went wrong";

      toast.error(text);
    },
  });

  const onSubmit = (data) => {
    data.recommended = recommended;
    data.subscriptionId = subscription?._id;
    subscriptionMutate(data);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1 w-full">
          <div className="flex gap-2 items-center ">
            <label className="block text-md font-medium text-gray-700">
              Subscription Name{" "}
              <span>
                <sup className="text-red-500 text-md">*</sup>
              </span>
            </label>
          </div>
          <input
            type="text"
            className={` ${
              errors?.name && "border-red-500"
            } mt-1 px-2 py-1  border border-gray-400 outline-none focus:border-primary rounded w-full`}
            defaultValue={subscription?.name}
            placeholder="Enter name"
            {...register("name", {
              required: true,
            })}
          />
          <p className="text-xs text-red-500 mt-1">
            {errors?.name && "Subscription name is required."}
          </p>
        </div>

        <div className="mb-1 w-full">
          <div className="flex gap-2 items-center ">
            <label className="block text-md font-medium text-gray-700">
              Amount
              <span>
                <sup className="text-red-500 text-md">*</sup>
              </span>
            </label>
          </div>
          <input
            type="number"
            defaultValue={subscription?.amount}
            className={` ${
              errors?.amount && "border-red-500"
            } mt-1 px-2 py-1  border border-gray-400 outline-none focus:border-primary rounded w-full`}
            placeholder="Enter amount name"
            {...register("amount", {
              required: true,
            })}
          />
          <p className="text-xs text-red-500 mt-1">
            {errors?.amount && "Amount is required."}
          </p>
        </div>
        <div className="mb-1 w-full">
          <div className="flex gap-2 items-center ">
            <label className="block text-md font-medium text-gray-700">
              Duration (in Months)
              <span>
                <sup className="text-red-500 text-md">*</sup>
              </span>
            </label>
          </div>
          <input
            defaultValue={subscription?.noOfMonths}
            type="number"
            className={` ${
              errors?.amount && "border-red-500"
            } mt-1 px-2 py-1  border border-gray-400 outline-none focus:border-primary rounded w-full`}
            placeholder="Enter duration"
            {...register("noOfMonths", {
              required: true,
            })}
          />
          <p className="text-xs text-red-500 mt-1">
            {errors?.noOfMonths && "Duration is required."}
          </p>
        </div>
        <div className="flex gap-3 items-center ">
          <Checkbox
            checked={recommended}
            onChange={(event) => setRecommended(event.currentTarget.checked)}
          />
          <label htmlFor="">
            Recommended (Check if this is a recommened subscription )
          </label>
        </div>
        <div className="mb-1 w-full">
          <div className="flex gap-2 items-center ">
            <label className="block text-md font-medium text-gray-700">
              Descriptions
              <span>
                <sup className="text-red-500 text-md">*</sup>
              </span>
            </label>
          </div>
          <textarea
            defaultValue={subscription?.description}
            className={` ${
              errors?.description && "border-red-500"
            } mt-1 px-2 py-1  border border-gray-400 outline-none focus:border-primary rounded w-full`}
            placeholder="Enter brief description"
            {...register("description", {
              required: true,
            })}
          ></textarea>
          <p className="text-xs text-red-500 mt-1">
            {errors?.description && "Description name is required."}
          </p>
        </div>
        <div className="mb-1 w-full">
          <div className="flex gap-2 items-center ">
            <label className="block text-md font-medium text-gray-700">
              Points (separated by comma ,)
              <span>
                <sup className="text-red-500 text-md">*</sup>
              </span>
            </label>
          </div>
          <textarea
            defaultValue={subscription?.points}
            className={` ${
              errors?.points && "border-red-500"
            } mt-1 px-2 py-1  border border-gray-400 outline-none focus:border-primary rounded w-full`}
            placeholder="Enter points eg: Access to premium test papers, 90 days of access, Pass guarantee  "
            {...register("points", {
              required: true,
            })}
          ></textarea>
          <p className="text-xs text-red-500 mt-1">
            {errors?.points && "Points are required."}
          </p>
        </div>

        {/* button */}
        <div className="my-4 flex justify-center">
          <button
            disabled={loadingSubscription}
            className="bg-primary disabled:bg-gray-600 disabled:cursor-not-allowed text-light rounded-md  px-3 py-2  "
          >
            {loadingSubscription ? "Processing..." : "Edit Subscription"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSubscription;
