import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Avatar, Loader } from "@mantine/core";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { TiDelete } from "react-icons/ti";

function UploadProfilePic({ userId, closeModal }) {
  const axios = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState([]);
  const [hasPic, setHasPic] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (hasPic)
      return toast.warn("Remove selected file before droping another file");

    if (droppedFiles.length === 1) {
      const fileInput = document.getElementById("fileInput");
      fileInput.files = droppedFiles;
      if (droppedFiles[0].type.startsWith("image/")) {
        setSelectedFile(droppedFiles[0]);
        setHasPic(true);
      } else {
        toast.warn("Please drop image only.");
      }
    } else {
      toast.warn("Please drop only one file.");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm();
  const queryClient = useQueryClient();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setHasPic(true);
  };

  const uploadFnc = (data) => {
    return axios.patch(`/user/update/profile-image/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const { mutate: uploadMutate, isPending: loadingUpload, error } = useMutation(
    {
      mutationFn: uploadFnc,
      onSuccess: (response) => {
        reset();
        const text = response.data.message;
        queryClient.invalidateQueries(`client-${userId}`);
        toast.success(text);
        closeModal();
      },
      onError: (err) => {
        const text = err?.response.data.message || "something went wrong";
        toast.error(text);
      },
    }
  );

  const onSubmitting = (data) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadMutate(formData);
  };

  return (
    <div className="">
      <form action="" onSubmit={handleSubmit(onSubmitting)}>
        <div className="  ">
          <div className="">
            {hasPic ? (
              <div class="flex flex-col justify-center items-center  overflow-hidden border border-dotted border-gray-600 bg-gray-100 pt-2  ">
                <Avatar
                  className="w-auto h-auto rounded-full "
                  src={URL.createObjectURL(selectedFile)}
                />
                <div
                  className="text-sm flex justify-center my-3 items-center cursor-pointer"
                  onClick={() => {
                    setSelectedFile([]);
                    setHasPic(false);
                  }}
                >
                  <TiDelete color="red" size={15} /> Remove Photo
                </div>
              </div>
            ) : (
              <div className="">
                <div
                  class="flex flex-col justify-center items-center  cursor-pointer overflow-hidden border border-dotted border-gray-600 bg-gray-100 pt-2 h-[100px]  "
                  onClick={() => document.getElementById("fileInput").click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label htmlFor="fileInput" className="text-gray-700 italic">
                    Choose a file
                  </label>
                  <p className=" text-gray-700 italic">or</p>
                  <p className=" text-gray-700 italic">Drop file here</p>
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    name="fileInput"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-center py-10">
              {loadingUpload ? (
                <div className="flex gap-1 items-center">
                  <span className="primary">Adding...</span>
                  <Loader color="green" size={20} />
                </div>
              ) : (
                <button className="bg-primary text-light px-6 py-2 rounded-md hover:bg-gray-800">
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadProfilePic;
