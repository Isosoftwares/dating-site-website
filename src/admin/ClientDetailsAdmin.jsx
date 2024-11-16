import React from "react";
import { Modal, Loader, Skeleton } from "@mantine/core";
import { CiCirclePlus } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

function ClientDetailsAdmin() {
  const axios = useAxiosPrivate();
  const { _id } = useParams();
  const [
    AddBizopened,
    { open: openAddBiz, close: closeAddBiz },
  ] = useDisclosure(false);

  // Fetch user data
  const getUser = async () => {
    return await axios.get(`/client/one/${_id}`);
  };

  const { isLoading: loadingUser, data: userData, error: errorData } = useQuery(
    {
      queryFn: getUser,
      queryKey: [`client-${_id}`],
      keepPreviousData: true,
      retry: false,
    }
  );

  const message = errorData?.response?.data?.message;

  return (
    <div className="">
    
    
    </div>
  );
}

export default ClientDetailsAdmin;
