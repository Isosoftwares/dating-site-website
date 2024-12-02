import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { Pagination, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import UsercardLikes from "./UsercardLikes";

function ViewedProfiles() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const [perPage, setPerPage] = useState(36);
  const [activePage, setPage] = useState(1);

  const getProfiles = async ({}) => {
    return await axios.get(
      `/user/viewed-profiles/${auth?.userId}?page=${activePage}&limit=${perPage}`
    );
  };

  const {
    isLoading: loadingUsers,
    data: usersData,
    refetch: refetchUsers,
    isRefetching: refetchingUsers,
  } = useQuery({
    queryFn: getProfiles,
    queryKey: [`viewed-profiles`],
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(usersData?.data?.count / perPage);

  useEffect(() => {
    refetchUsers();
  }, [perPage, activePage]);

  return (
    <div>
      <div className="pb-14">
        {loadingUsers ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        ) : usersData?.data?.message ? (
          <div className="py-10 bg-light ">
            <p className="font-bold text-center ">{usersData?.data?.message}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2">
            {usersData?.data?.users?.map((item, index) => {
              if (item?.profileImg && !item?.images.includes(item.profileImg)) {
                item.images.push(item.profileImg);
              }

              return (
                <div key={index} className="">
                  <UsercardLikes user={item} />
                </div>
              );
            })}
          </div>
        )}
        {totalPages > 0 && (
          <div className="px-2 py-3 mt-4 bg-light ">
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

export default ViewedProfiles;
