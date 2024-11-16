import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Loader, Pagination } from "@mantine/core";
import useAuth from "../hooks/useAuth";

function Payments() {
  const { auth } = useAuth();
  const axios = useAxiosPrivate();
  const [perPage, setPerPage] = useState(50);
  const [activePage, setPage] = useState(1);
  const [clientId, setClientId] = useState(auth?.userId);

  //   fetching user payment history
  const fetchPayments = () => {
    return axios.get(
      `/payments?page=${activePage}&perPage=${perPage}&clientId=${clientId}`
    );
  };

  const {
    isLoading: loadingPayments,
    data: paymentsData,
    refetch,
    isRefetching: refetchingPayments,
  } = useQuery({
    queryKey: [`payments-${clientId}`],
    queryFn: fetchPayments,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });
  const totalPages = Math.ceil(paymentsData?.data?.count / perPage) || 0;
  //end of fetching payments------------------
  useEffect(() => {
    refetch();
  }, [perPage, activePage]);
  return (
    <div>
      {/* payment History  */}
      <div className=" pb-10 ">
        <h1 className="text font-bold mb-2 ">Recent deposit transactions</h1>

        {/* Table */}
        <div className="overflow-x-auto overflow-y-auto relative shadow-sm sm:rounded-md theme ">
          <table className="w-full text-md table-auto text-left ">
            <thead className="text-xs text  bg-opacity-30 border-b dark:border-b-gray-900 ">
              <tr className="bg-secondary/35 dark:bg-gray-800  ">
                <th className="py-[5px] text-start px-2 text-md ">SNo</th>
                <th className="py-[2px] text-start px-2 text-md">ID/CODE</th>
                <th className="py-[2px] text-start px-2 text-md">Mode </th>
                <th className="py-[2px] text-start px-2 text-md">Phone No</th>
                <th className="py-[2px] text-start px-2 text-md">
                  description
                </th>
                <th className="py-[2px] text-start px-2 text-md">Date</th>
                <th className="py-[2px] text-start px-2 text-md">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loadingPayments  || refetchingPayments ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <Loader color="#2667ff" size={25} />
                  </td>
                </tr>
              ) : paymentsData?.data?.message ? (
                <tr>
                  <td colSpan={7} className="text text-center py-3  ">
                    <p>{paymentsData?.data?.message} </p>
                  </td>
                </tr>
              ) : (
                paymentsData?.data?.payments?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="theme border-b dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 dark:odd:bg-dark odd:bg-[#fcfcfc]"
                    >
                      <td className="py-2 text- text-start px-2">
                        {" "}
                        {index + 1}.{" "}
                      </td>
                      <td className="py-2 px-1 text- text-start ">
                        {" "}
                        {item?.transactionCode}{" "}
                      </td>
                      <td className="py-2 px-1 text- text-start ">
                        {item?.modeOfPayment}{" "}
                      </td>

                      <td className="py-2 px-1 text- text-start ">
                        {item?.phoneNo}
                      </td>
                      <td className="py-2 px-1 text- text-start ">
                        {item?.description}{" "}
                      </td>
                      <td className="py-2 px-1 text- text-start ">
                        {item?.createdAt?.substr(0, 10)}
                      </td>
                      <td className="py-2 px-1 text- text-start font-bold ">
                        ksh {item?.amount}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="my-3 px-2">
            <Pagination
              total={totalPages}
              page={activePage}
              color="green"
              onChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
