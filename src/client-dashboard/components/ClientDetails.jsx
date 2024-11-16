import React from "react";
import formatDateTime from "../../utils/formatDateandTime";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useAuth from "../../hooks/useAuth";

function ClientDetails({ client }) {
  const [ediOpened, { open: openedit, close: closeEdit }] = useDisclosure(
    false
  );
  const [
    openedAddBal,
    { open: openAddBal, close: closeAddBal },
  ] = useDisclosure(false);
  const [
    openedEditSubAmount,
    { open: openEditSubAmount, close: closeEditSubAmount },
  ] = useDisclosure(false);

  const { auth } = useAuth();

  return (
    <div className=" w-full theme shadow-sm rounded-md p-6">
  
   
      {/* Header with title and edit link */}
      <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-200 dark:border-gray-700">
        <h2 className=" font-semibold text-gray-800 dark:text-gray-200">
          Account Details
        </h2>
      </div>

      {/* Account Information Fields */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Name:
          </span>
          <span className="text-gray-800 dark:text-gray-100 font-bold">
            {client?.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Email:
          </span>
          <span className="text-gray-800 dark:text-gray-100 font-bold">
            {client?.email}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Phone:
          </span>
          <span className="text-gray-800 dark:text-gray-100 font-bold">
            {client?.phoneNo}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Subscription Amount (per Month):
          </span>
          <span className="text-gray-800 dark:text-gray-100 font-bold">
            ksh {client?.subscriptionAmount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Balance:
          </span>
          <span className="text-gray-800 dark:text-gray-100 font-bold">
            ksh {client?.balance}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Join Date:
          </span>
          <span className="text-gray-800 dark:text-gray-100 font-bold">
            {formatDateTime(client?.createdAt)}
          </span>
        </div>
      </div>

      {/* Edit Details Button */}
      <div className="mt-6 flex gap-3 justify-center flex-wrap">
        <button
          onClick={openedit}
          className="bg-primary text-white px-1 py-2 rounded-md "
        >
          Edit Details
        </button>
        {auth?.roles?.includes("Admin") && (
          <button
            onClick={openAddBal}
            className="bg-gray-600 text-white px-1 py-2 rounded-md "
          >
            Add User Balance
          </button>
        )}
        {auth?.roles?.includes("Admin") && (
          <button
            onClick={openEditSubAmount}
            className="bg-secondary text-white px-1 py-2 rounded-md "
          >
            Edit Subscription Amount
          </button>
        )}
      </div>
    </div>
  );
}

export default ClientDetails;
