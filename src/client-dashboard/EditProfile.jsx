import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, MultiSelect } from "@mantine/core";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

function EditProfile({ client, closeModal }) {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({});
  // location
  const [location, setLocation] = useState({
    country: "",
    city: "",
    town: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIPBasedLocation = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json/`);
        if (!response.ok) throw new Error("Failed to fetch IP location data.");
        const data = await response.json();
        setLocation({
          country: data.country_name,
          city: data.region,
          town: data.city,
        });
        setValue("country", data.country_name);
        setValue("city", data.region);
        setValue("town", data.city);
      } catch (err) {
        setError("Failed to fetch location data.");
      }
    };
    fetchIPBasedLocation();
  }, [setValue]);
  // edn location

  // Predefined languages for MultiSelect
  const languages = [
    "English",
    "Kiswahili",
    "Spanish",
    "French",
    "German",
    "Arabic",
    "Mandarin",
    "Hindi",
    "Russian",
    "Portuguese",
  ];

  // Fetch user details
  const getUser = async () => {
    return await axios.get(`/user/account/${auth?.userId}`);
  };

  const { isLoading, data: userData } = useQuery({
    queryFn: getUser,
    queryKey: [`user-${auth?.userId}`],
    keepPreviousData: true,
  });
  const user = userData?.data?.user;

  const editFn = (data) => {
    return axios.patch(`/user/update/account/${auth?.userId}`, data);
  };

  const { mutate: editMutate, isPending: loadingEdit } = useMutation({
    mutationFn: editFn,
    onSuccess: (response) => {
      reset();
      const text = response?.data?.message;
      toast.success(text);
      queryClient.invalidateQueries(`client-${user?._id}`);
      closeModal();
    },
    onError: (err) => {
      const text = err.response?.data?.message;
      toast.error(text);
    },
  });

  const onSubmitting = (data) => {
    console.log(data);
    editMutate(data);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen  ">
        <Loader color="teal" size={30} />
      </div>
    );

  return (
    <div>
      <div className="bg-primary/20 pt-[40px] md:pt-[40px] pb-10 px-3 md:px-8 xl:px-[100px]">
        <div className="flex flex-col md:flex-row justify-start gap-4 items-center">
          <p className="font-bold text-xl text-gray-600">Edit Profile</p>
          <div>
            <span className="font-bold capitalize">
              {auth?.userName}, update your details to enhance your dating
              experience
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 md:px-[100px] xl:px-[200px] py-6">
        <form onSubmit={handleSubmit(onSubmitting)} className="space-y-6">
          {/* Flex container for Basic Info and Location */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Basic Info Section */}
            <div className="bg-white p-4 rounded-md shadow-md flex-1">
              <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-4">
                Basic Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600">Name</label>
                  <input
                    {...register("userName", { required: "Name is required" })}
                    type="text"
                    className="input"
                    defaultValue={user?.userName}
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    className="input"
                    defaultValue={user?.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600">Date of Birth</label>
                  <select
                    {...register("dob", {
                      required: "Date of Birth is required",
                    })}
                    className="input"
                    defaultValue={user?.dob}
                  >
                    <option value="">Select Year</option>
                    {Array.from(
                      { length: new Date().getFullYear() - 1900 },
                      (_, i) => (
                        <option key={1900 + i} value={1900 + i}>
                          {1900 + i}
                        </option>
                      )
                    ).reverse()}
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                  disabled={loadingEdit}
                >
                  {loadingEdit ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white p-4 rounded-md shadow-md flex-1">
              <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-4">
                Location
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600">Country</label>
                  <input
                    {...register("country")}
                    type="text"
                    className="input"
                    defaultValue={user.country}
                  />
                </div>
                <div>
                  <label className="block text-gray-600">City</label>
                  <input
                    {...register("city")}
                    type="text"
                    defaultValue={user.city}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Town</label>
                  <input
                    {...register("town")}
                    type="text"
                    defaultValue={user.town}
                    className="input"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                  disabled={loadingEdit}
                >
                  {loadingEdit ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-4">
              Personal Details
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-gray-600">Gender</label>
                  <select
                    {...register("gender")}
                    className="input"
                    defaultValue={user?.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">Interested In</label>
                  <select
                    {...register("interestedInGender")}
                    defaultValue={user?.interestedInGender}
                    className="input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">Hair Color</label>
                  <input
                    {...register("hairColor")}
                    type="text"
                    className="input"
                    defaultValue={user?.hairColor}
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Eye Color</label>
                  <input
                    {...register("eyeColor")}
                    type="text"
                    defaultValue={user?.eyeColor}
                    className="input"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-gray-600">Height</label>
                  <select
                    name="height"
                    className="input"
                    id="height"
                    {...register("height")}
                    defaultValue={user?.height || ""}
                  >
                    <option value="">Select height...</option>
                    <option value="4'7 (140cm)">4'7" (140cm)</option>
                    <option value="4'8 (142cm)">4'8" (142cm)</option>
                    <option value="4'9 (145cm)">4'9" (145cm)</option>
                    <option value="4'10 (147cm)">4'10" (147cm)</option>
                    <option value="4'11 (150cm)">4'11" (150cm)</option>
                    <option value="5'0 (152cm)">5'0" (152cm)</option>
                    <option value="5'1 (155cm)">5'1" (155cm)</option>
                    <option value="5'2 (157cm)">5'2" (157cm)</option>
                    <option value="5'3 (160cm)">5'3" (160cm)</option>
                    <option value="5'4 (163cm)">5'4" (163cm)</option>
                    <option value="5'5 (165cm)">5'5" (165cm)</option>
                    <option value="5'6 (168cm)">5'6" (168cm)</option>
                    <option value="5'7 (170cm)">5'7" (170cm)</option>
                    <option value="5'8 (173cm)">5'8" (173cm)</option>
                    <option value="5'9 (175cm)">5'9" (175cm)</option>
                    <option value="5'10 (178cm)">5'10" (178cm)</option>
                    <option value="5'11 (180cm)">5'11" (180cm)</option>
                    <option value="6'0 (183cm)">6'0" (183cm)</option>
                    <option value="6'1 (185cm)">6'1" (185cm)</option>
                    <option value="6'2 (188cm)">6'2" (188cm)</option>
                    <option value="6'3 (191cm)">6'3" (191cm)</option>
                    <option value="6'4 (193cm)">6'4" (193cm)</option>
                    <option value="6'5 (196cm)">6'5" (196cm)</option>
                    <option value="6'6 (198cm)">6'6" (198cm)</option>
                    <option value="6'7 (201cm)">6'7" (201cm)</option>
                    <option value="6'8 (203cm)">6'8" (203cm)</option>
                    <option value="6'9 (206cm)">6'9" (206cm)</option>
                    <option value="6'10 (208cm)">6'10" (208cm)</option>
                    <option value="6'11 (211cm)">6'11" (211cm)</option>
                    <option value="7'0 (213cm)">7'0" (213cm)</option>
                    <option value="7'1 (216cm)">7'1" (216cm)</option>
                    <option value="7'2 (218cm)">7'2" (218cm)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">Weight</label>
                  <select
                    name="weight"
                    className="input"
                    id="weight"
                    {...register("weight")}
                    defaultValue={user?.weight || ""}
                  >
                    <option value="">Select weight...</option>
                    {Array.from({ length: 181 }, (_, i) => {
                      const kg = 40 + i; // Start from 40kg
                      const lb = Math.round(kg * 2.20462); // Convert to pounds
                      return (
                        <option key={kg} value={`${kg}kg (${lb}lb)`}>
                          {kg}kg ({lb}lb)
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">Body Type</label>
                  <select
                    name=""
                    className="input"
                    id=""
                    {...register("bodyType")}
                    defaultValue={user?.bodyType}
                  >
                    <option value="">Select body type</option>
                    <option value="Petite">Petite</option>
                    <option value="Slim">Slim</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Average">Average</option>
                    <option value="Few Extra Pounds">Few Extra Pounds</option>
                    <option value="Full Figured">Full Figured</option>
                    <option value="Large and Lovely">Large and Lovely</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">
                    Languages Spoken
                  </label>
                  <MultiSelect
                    data={languages}
                    defaultValue={user?.languageSpoken}
                    onChange={(value) => setValue("languageSpoken", value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md"
                disabled={loadingEdit}
              >
                {loadingEdit ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-4">
              Additional Details
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-gray-600">Ethnicity</label>
                  <input
                    {...register("ethnicity")}
                    type="text"
                    defaultValue={user?.ethnicity}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Marital Status</label>
                  <select
                    {...register("maritalStatus")}
                    defaultValue={user?.maritalStatus}
                    className="input"
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">
                    Type of Relationship
                  </label>
                  <input
                    {...register("typeOfRelationship")}
                    type="text"
                    defaultValue={user?.typeOfRelationship}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Seeking Age</label>
                  <input
                    {...register("seekingAge")}
                    type="text"
                    defaultValue={user?.seekingAge}
                    className="input"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-gray-600">Religion</label>
                  <input
                    {...register("religion")}
                    type="text"
                    defaultValue={user?.religion}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Occupation</label>
                  <input
                    {...register("occupation")}
                    type="text"
                    defaultValue={user?.occupation}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">
                    Personal Description
                  </label>
                  <textarea
                    defaultValue={user?.description}
                    {...register("description")}
                    rows="4"
                    className="input"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-600">
                    What I'm Looking For
                  </label>
                  <textarea
                    defaultValue={user?.whatAmLookingFor}
                    {...register("whatAmLookingFor")}
                    rows="4"
                    className="input"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md"
                disabled={loadingEdit}
              >
                {loadingEdit ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
