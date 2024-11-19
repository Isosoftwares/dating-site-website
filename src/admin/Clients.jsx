import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, Modal, Pagination } from "@mantine/core";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import DeleteUser from "./components/DeleteUser";
import UpdateuserStatus from "./components/UpdateuserStatus";
import { IoSearch } from "react-icons/io5";

function Clients() {
  const axios = useAxiosPrivate();
  const [perPage, setPerPage] = useState(40);
  const [activePage, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [
    openedAddDelete,
    { open: openDelete, close: closeDelete },
  ] = useDisclosure(false);

  const [
    openedUpdateStatus,
    { open: openUpdateStatus, close: closeupdateStatus },
  ] = useDisclosure(false);

  const getClients = () => {
    return axios.get(
      `/user/all/admin?page=${activePage}&perPage=${perPage}&searchTerm=${searchTerm}`
    );
  };

  const {
    isLoading: loadingBuyers,
    data: buyerData,
    refetch,
    isRefetching: refetchingBuyers,
  } = useQuery({
    queryKey: [`buyers-`, activePage],
    queryFn: getClients,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(buyerData?.data?.count / perPage) || 0;

  // pagination refetch
  useEffect(() => {
    refetch();
  }, [activePage, perPage, searchTerm]);

  //end of fetching buyers------------------

  // reset filters
  const resetFilters = () => {
    setPerPage(30);
    setPage(1);
    setEmail("");
  };

  return (
    <div className="">
      {/* delete */}
      <Modal opened={openedAddDelete} onClose={closeDelete} title="Delete User">
        <DeleteUser deleteUserId={deleteUserId} closeModal={closeDelete} />
      </Modal>

      {/* update status */}
      <Modal
        opened={openedUpdateStatus}
        onClose={closeupdateStatus}
        title="Update User Status"
      >
        <UpdateuserStatus
          userId={userId}
          closeModal={closeupdateStatus}
          status={status}
        />
      </Modal>

      <h1 className="font-bold text-lg">All users </h1>
      <div className="my-[4px] ">
        {/* filters */}
        <div className="py-4 px-2 bg-light rounded-md">
          <div className="">
            <div className="relative">
              <div className="absolute text top-4 left-3 ">
                <IoSearch size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by name, email or username"
                className="w-full md:w-[50%] lg:w-[30%] px-4 pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200  "
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-auto relative shadow-sm sm:rounded-md theme mt-6">
            <table className="w-full text-md text-left">
              <thead className="text-xs bg-primary/35  border-b ">
                <tr>
                  <th className="py-[10px] capitalize text-start px-4 text-md">
                    Id
                  </th>
                  <th className="py-[10px] capitalize text-start px-2 text-md">
                    Name
                  </th>
                  <th className="py-[10px] capitalize text-start px-2 text-md">
                    Email
                  </th>
                  <th className="py-[10px] capitalize text-start px-2 text-md">
                    Status
                  </th>

                  <th className="py-[10px] capitalize text-center px-2 text-md">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {loadingBuyers || refetchingBuyers ? (
                  <tr className="">
                    <td colSpan={5} className="text-center py-4 ">
                      <Loader color="blue" size={30} />
                    </td>
                  </tr>
                ) : !buyerData?.data?.users ||
                  buyerData?.data?.users?.length < 1 ? (
                  <tr>
                    <td colSpan={5} className=" text-center py-3">
                      No users found!
                    </td>
                  </tr>
                ) : (
                  buyerData?.data?.users?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="theme border-b  hover:bg-gray-50 odd:bg-[#fcfcfc]"
                      >
                        <td className="py-2 text- text-start px-4">
                          {index + 1}
                        </td>

                        <td className="py-2 text- text-start px-2">
                          {item?.userName}
                        </td>
                        <td className="py-2 text- text-start px-2">
                          {item?.email}
                        </td>
                        <td className="py-2 text- text-start px-2">
                          <p
                            className={
                              item?.status === "Active"
                                ? "text-primary font-bold bg-primary/10 text-center rounded-md  "
                                : "text-red-500 font-bold bg-red-500/10 text-center rounded-md  "
                            }
                          >
                            {item?.status}
                          </p>
                        </td>

                        <td className=" py-3 px-3 flex justify-center items-center  gap-3">
                          {item?.status === "Active" ? (
                            <button
                              onClick={() => {
                                setStatus("Inactive");
                                setUserId(item?._id);
                                openUpdateStatus();
                              }}
                              className="bg-red-500/40  text-red-900 rounded-md px-3 py-1 hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-gray-300"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setUserId(item?._id);
                                setStatus("Active");
                                openUpdateStatus();
                              }}
                              className="bg-primary/20 text-primary rounded-md px-5 py-1 hover:bg-secondary disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-gray-300"
                            >
                              Activate
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setDeleteUserId(item?._id);
                              openDelete();
                            }}
                            className="bg-red-500/40 text-red-900  rounded-md px-3 py-1 hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-gray-300"
                          >
                            Delete
                          </button>
                          <Link
                            to={`/dashboard/clients/${item._id}`}
                            className="bg-primary/90 text-light rounded-md px-3 py-1 hover:bg-secondary"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div className="my-3">
              <Pagination
                total={totalPages}
                page={activePage}
                color="green"
                onChange={setPage}
              />
            </div>
          </div>
        </div>
        {/* end of filters */}
      </div>
    </div>
  );
}

export default Clients;
