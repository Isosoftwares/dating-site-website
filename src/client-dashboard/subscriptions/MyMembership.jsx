import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Loader } from "@mantine/core";
import SubscriptionCountDown from "../../utils/SubscriptionCountdown";
import { Link } from "react-router-dom";

function MyMembership() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();

  const getClientSWithSubs = async () => {
    return await axios.get(`/user-subscriptions/one/${auth?.userId}`);
  };

  const {
    isLoading: loadingSubs,
    data: subsData,
    refetch: refetchSubscriptions,
    isRefetching: refetchingSubs,
  } = useQuery({
    queryFn: getClientSWithSubs,
    queryKey: [`subs-${auth?.userId}`],
    keepPreviousData: true,
  });

  console.log(subsData?.data);

  return (
    <div>
      <div className="bg-primary/20  pt-[40px] md:pt-[40px] pb-10 px-3 md:px-8 xl:px-[100px] ">
        <div>
          <p className="font-bold text-xl text-gray-600">Online users</p>
        </div>
      </div>

      <div className="mx-auto px-4 md:px-[100px] xl:px-[200px] py-6">
        <div className="bg-light mt-4 py-10 ">
          <p className="font-bold text-center  "> Your subscriptions</p>
          {loadingSubs ? (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          ) : !subsData?.data?.subscriptions?.length ? (
            <div className="flex flex-col justify-center w-full items-center">
              <div className="flex justify-center flex-col gap-3 ">
                <p className="text-center">
                  You dont have any subscription yet
                </p>
                <div>
                  <Link to={"/client/upgrade"}>
                    <span className="primary-btn ml-10 ">Upgrade Now!</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 mx-3">
              {subsData?.data?.subscriptions?.map((item, index) => {
                return (
                  <div key={index}>
                    <SubscriptionCountDown subscription={item} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyMembership;
