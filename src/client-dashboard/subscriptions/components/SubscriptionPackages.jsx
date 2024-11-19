import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

function SubscriptionPackages({ serviceName, inModal }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const getSubscriptions = () => {
    return axios.get(`/subscriptions`);
  };

  const {
    isLoading: loadingSubs,
    data: subscriptionsData,
    refetch,
    isRefetching: refetchingSubs,
  } = useQuery({
    queryKey: [`subscriptions-`],
    queryFn: getSubscriptions,
    keepPreviousData: true,
  });

  const splitStringIntoArray = (str) => {
    return str.split(",").map((item) => item.trim());
  };

  //   subscribe
  const subscribeFn = (data) => {
    return axios.post("/subscriptions/subscribe", data);
  };

  const {
    mutate: subscribeMutate,
    isPending: loadingSubscribe,
    error,
  } = useMutation({
    mutationFn: subscribeFn,
    onSuccess: (response) => {
      const url = response.data.url;
      const text = response.data.message;
      if (url !== "No url") {
        window.location = url;
      }
      toast.success(text);
      //   queryClient.invalidateQueries([`subscriptions`]);
    },
    onError: (err) => {
      const text = err?.response.data.message || "Something went wrong";

      toast.error(text);
    },
  });

  const freePoints = [
    "Access to all free practice test questions",
    "Performance monitoring and insights",
    "Questions with in-depth explanations",
    "Thorough performance analysis",
  ];

  const numberOfDays = (duration) => {
    return `For ${duration * 30} Days`;
  };

  return (
    <div className="py-10 overflow-hidden">
      <p className="text-xl text-center capitalize font-bold mt-6 ">
        select Package
      </p>
      {loadingSubs ? (
        <p className="text-center font-bold">Getting subscriptions...</p>
      ) : (
        <div className="">
          <div
            className={`flex flex-col ${
              inModal
                ? "lg:grid lg:grid-cols-2"
                : "lg:grid lg:grid-cols-3 gap-6"
            } gap-3  `}
          >
            {subscriptionsData?.data?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={` ${
                    item?.recommended
                      ? "bg-secondary border-secondary bg-opacity-10"
                      : " bg-light"
                  } divide-y  w-full divide-gray-200 rounded-lg border-2  shadow-sm shadow-[#9fabe8] `}
                >
                  {item?.recommended && (
                    <p className="text-center font-bold  ">Recommended</p>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold leading-6 text-gray-900">
                      {item?.name}
                    </h2>
                    <p className="my-4 text-3xl font-bold tracking-tight text-gray-900">
                      $ {item?.amount}
                      <span className="text-base font-medium text-gray-500 ml-1">
                        {numberOfDays(item?.noOfMonths)}
                      </span>
                    </p>
                    <div className="flex-col">
                      <button
                        disabled={loadingSubscribe}
                        className={` ${
                          item?.recommended && "bg-secondary border-secondary"
                        } shadow-lg mt-3 block w-full rounded-md border border-gray-800 bg-primary py-2 text-center disabled:bg-gray-500  font-semibold text-white hover:bg-gray-900`}
                        onClick={() => {
                          subscribeMutate({
                            clientId: auth?.userId,
                            subscriptionId: item?._id,
                          });
                        }}
                      >
                        {loadingSubscribe ? "Please Wait..." : "Get Started →"}
                      </button>
                    </div>
                    <p className="mt-4">{item?.description}</p>
                  </div>
                  <div className="px-2 pt-6 pb-8">
                    <h3 className=" font-medium text-gray-900">
                      What's included
                    </h3>
                    {loadingSubs ? (
                      <p>Getting subscriptions...</p>
                    ) : (
                      <div>
                        {splitStringIntoArray(item?.points)?.map(
                          (point, index) => {
                            return (
                              <div
                                key={index}
                                className="flex gap-2 items-center my-2 px-2"
                              >
                                <div className="basis-1/12 flex justify-center items-center ">
                                  <IoMdCheckmarkCircle
                                    size={18}
                                    color={`${
                                      item?.recommended ? "#06D001" : "blue"
                                    }`}
                                  />
                                </div>
                                <p className="capitalize basis-11/12 ">
                                  {point}
                                </p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPackages;
