import React, { useEffect, useState } from "react";
import { Modal, Pagination } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import AddSubscription from "./components/AddSubscription";
import EditSubscription from "./components/EditSubscription";
import DeleteSubscription from "./components/DeleteSubscription";
import ViewSubscription from "./components/ViewSubscription";
import useAuth from "../hooks/useAuth";

function SubscriptionsAdmin() {
  const [serviceName, setServiceName] = useState("");
  const { auth } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(
    false
  );
  const [
    openedDelete,
    { open: openDelete, close: closeDelete },
  ] = useDisclosure(false);
  const [openedView, { open: openView, close: closeView }] = useDisclosure(
    false
  );
  const axios = useAxiosPrivate();
  const [subscription, setSubscription] = useState({});

  const getSubscriptions = () => {
    return axios.get(`/subscriptions?serviceName=${serviceName}`);
  };

  const {
    isLoading: loadingSubs,
    data: subscriptionsData,
    refetch,
    isRefetching: refetchingSubs,
  } = useQuery({
    queryKey: [`subscriptions`],
    queryFn: getSubscriptions,
    keepPreviousData: true,
  });
  const handleEdit = () => {
    closeView();
    openEdit();
  };

  useEffect(() => {
    refetch();
  }, [serviceName]);

  if (auth?.roles?.includes("Manager")) {
    return (
      <div className="bg-light p-5 text-center ">
        <p className="text-brown-600 text-lg font-bold">Unauthorized!</p>
        <p>Contact Admin for any subscription related updates!</p>
      </div>
    );
  }

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Add subscription.">
        <AddSubscription handleClose={close} />
      </Modal>
      <Modal opened={openedEdit} onClose={closeEdit} title="Edit subscription.">
        <EditSubscription subscription={subscription} handleClose={closeEdit} />
      </Modal>
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        title="Delete subscription."
      >
        <DeleteSubscription
          subscription={subscription}
          handleClose={closeDelete}
        />
      </Modal>
      <Modal
        opened={openedView}
        onClose={closeView}
        title="Subscription Details."
        centered
      >
        <ViewSubscription subscription={subscription} handleEdit={handleEdit} />
      </Modal>
      <div className="flex justify-between items-center   ">
        <p className="font-bold text-lg ">Subscriptions</p>
        <button
          className="bg-primary text-light rounded-md  px-3 py-2  mr-3 "
          onClick={open}
        >
          Add Subscription
        </button>
      </div>

      {/* subs */}
      <div>
        {/* table */}
        <div className="relative overflow-x-auto sm:rounded-lg  py-5 bg-white px-2 mt-2 ">
          <p className="font-bold">
            {serviceName ? serviceName : "All"} Subscriptions
          </p>
          {/*  */}
          <div className="overflow-x-auto overflow-y-auto mt-3 border relative sm:rounded-md bg-white  ">
            <table className="w-full text-sm text-left  text-gray-700 ">
              <thead
                className={`text-xs text-gray-800 capitalize bg-[#fffefe] border-y border-y-tertiary bg-opacity-30  `}
              >
                <tr>
                  <th scope="col" className="py-2 px-5">
                    #
                  </th>
                  <th scope="col" className="px-6 py-1">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-1">
                    Amount
                  </th>
                  <th scope="col" className="px-6 text-center py-1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingSubs || refetchingSubs ? (
                  <tr>
                    <td colSpan={5} className="text-center  py-4">
                      <LoadingSpinner size={25} />
                    </td>
                  </tr>
                ) : !subscriptionsData?.data?.length ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-gray-800 text-center  py-3 "
                    >
                      No subscriptions found!
                    </td>
                  </tr>
                ) : (
                  subscriptionsData?.data?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b  hover:bg-gray-50 d"
                      >
                        <td className="w-4 p-4">{index + 1}</td>
                        <td className="px-6 font-bold text-blue-500 py-4 capitalize">
                          {item?.name}
                        </td>
                        <td className="px-6 py-4 font-bold ">
                          ${item?.amount?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className="font-medium text-primary border px-3 py-2 rounded hover:bg-primary hover:bg-opacity-10 cursor-pointer  border-primary "
                            onClick={() => {
                              setSubscription(item);
                              openView();
                            }}
                          >
                            View
                          </span>
                          <span
                            className="font-medium text-blue-100 rounded-md  px-6 py-2  mx-2 hover:bg-opacity-90 cursor-pointer  bg-primary "
                            onClick={() => {
                              setSubscription(item);
                              openEdit();
                            }}
                          >
                            Edit
                          </span>

                          <span
                            className="font-medium mx-2 text-red-600 border px-3 py-2 rounded hover:bg-red-500 hover:bg-opacity-30 cursor-pointer  border-red-500 "
                            onClick={() => {
                              setSubscription(item);
                              openDelete();
                            }}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsAdmin;
