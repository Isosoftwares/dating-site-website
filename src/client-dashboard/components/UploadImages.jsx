import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import useAuth from "../../hooks/useAuth";

function UploadImages({ closeModal, userId }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const [sending, setSending] = useState(false);
  const handleUpload = () => {
    setSending(!sending);
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });

    formData.append("userId", userId);
    console.log(formData);

    axios
      .patch(`/user/update/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        queryClient.invalidateQueries([`user-${userId}`]);
        closeModal();
        toast.success(response?.data?.message);
        setSending(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
        setSending(false);
      });
  };

  return (
    <div className=" gap-3 py-2">
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="py-2 w-full px-1 rounded-md bg-gray-100"
        />
      </div>

      <div className="flex justify-center items-center pt-6">
        {sending ? (
          <div>
            <Loader color="blue" />
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => {
                handleUpload();
              }}
              disabled={selectedFiles.length === 0}
              className={`${
                selectedFiles.length > 0
                  ? "bg-secondary hover:bg-dark-700 hover:text-light"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded`}
            >
              Upload
            </button>

            <button
              onClick={() => {
                closeModal();
              }}
              className="bg-gray-500 hover:bg-dark-700 hover:text-light text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImages;
