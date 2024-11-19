import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mantine/hooks";
import { Pagination, Skeleton } from "@mantine/core";
import UserCard from "./UserCard";

function OverviewProfiles() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const [perPage, setPerPage] = useState(36);
  const [activePage, setPage] = useState(1);
  const [seeking, setSeeking] = useState("male");

  const [showFilters, setShowFilters] = useState(true);

  const getProfiles = async () => {
    return await axios.get(
      `/user?page=${activePage}&perPage=${perPage}&interestedInGender=${seeking}`
    );
  };

  const {
    isLoading: loadingUsers,
    data: usersData,
    refetch: refetchUsers,
    isRefetching: refetchingUsers,
  } = useQuery({
    queryFn: getProfiles,
    queryKey: [`users`],
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(usersData?.data?.count / perPage);

  useEffect(() => {
    refetchUsers();
  }, [perPage, activePage]);

  return (
    <div className="px-3 md:px-8 xl:px-[100px]">
      {/* filters */}
      <p className=""> </p>
      <div
        className={` ${
          !showFilters && "hidden"
        } grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-light shadow-secondary/5 px-4 pb-4 pt-2 shadow-md mt-[-20px] rounded-md `}
      >
        <div>
          <label htmlFor="">seeking</label>
          <select name="" className="input" id="">
            <option value="">Select....</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Country</label>
          <input type="text" className="input" />
        </div>
        <div>
          <label htmlFor="">City</label>
          <input type="text" className="input" />
        </div>
        <div>
          <label htmlFor="">seeking</label>
          <select name="" className="input" id="">
            <option value="">Select....</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
      </div>

      {/* profiles */}
      <div className="pb-14">
        <div>
          <p className="mt-3">
            Total: {usersData?.data?.count}{" "}
            <span
              onClick={() => {
                setShowFilters(!showFilters);
              }}
              className="font-bold text-blue-500 cursor-pointer   "
            >
              [{showFilters ? "Hide Filters" : "show filters"}]
            </span>{" "}
          </p>
        </div>

        {loadingUsers ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        ) : usersData?.data?.message ? (
          <div className="bg-light py-10  ">
            <p className="text-center font-bold  ">
              {usersData?.data?.message}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-7 md:grid-cols-4 gap-3">
            {usersData?.data?.users?.map((item, index) => {
              // Check if profileImg exists and is not already in the images array
              if (item?.profileImg && !item?.images.includes(item.profileImg)) {
                item.images.push(item.profileImg);
              }

              return (
                <div key={index}>
                  <UserCard user={item} />
                </div>
              );
            })}
          </div>
        )}
        {totalPages > 0 && (
          <div className="mt-4 bg-light py-3 px-2  ">
            <Pagination
              color="orange"
              value={activePage}
              onChange={setPage}
              total={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OverviewProfiles;
