import React from "react";
import Footer from "../components/Footer/Footer";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import whatsappNumber from "../utils/whatsappNumber";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendText = (data) => {
    return axios.post("/support", data);
  };

  const { mutate: messageMutate, isPending: loadingSend, error } = useMutation({
    mutationFn: sendText,

    onSuccess: (response) => {
      reset();
      const text = response?.data?.message;
      toast.success(text);
    },

    onError: (err) => {
      const text = err.response.data.message;
      toast.error(text);
    },
  });

  const onSubmitting = async (data) => {
    console.log(data);
    messageMutate(data);
  };
  return (
    <div>
      <Navbar />
      {/* hero */}
      {/* heror */}
      <div class="pt-[120px] bg-greend  bg-cover bg-no-repeat ">
        <div class=" text-center mx-auto py-5   ">
          <div>
            <h1 class="text-light text-3xl font-bold leading-tight mb-5">
              Contact Us
            </h1>
          </div>
        </div>
      </div>
      <div className=" mt-6 bg-gradientBg bg-blend-overlay bg-[#f8faf8]/20 dark:bg-[#0d0c1d55] bg-cover bg-no-repeat px-3 md:px-[50px]">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 dark:border-dark rounded-md">
            <div className="bg-gray-900 rounded-l-md md:col-span-4 p-10 text-white">
              <p className="mt-4 text-sm leading-7 font-regular uppercase">
                Contact
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-bold tracking-wide">
                Get In <span className="text-secondary sm:text-4xl">Touch</span>
              </h3>
              <p className="mt-4 leading-7 text-gray-200">
                Have questions? Reach out to us anytime—our team is here to help
                you with all your needs!
              </p>

              <div className="flex items-center mt-5 gap-2">
                <span className="text-secondary">
                  <FiPhoneCall size={22} />
                </span>
                <a href={`tel:${whatsappNumber()}`} className="text-secondary">
                  {whatsappNumber()}
                </a>
              </div>
              <div className="flex items-center mt-5 gap-2">
                <span className="text-secondary">
                  <MdOutlineMarkEmailRead size={22} />
                </span>

                <a
                  href="mailto:support@tapnserve.net"
                  className="text-secondary"
                >
                  support@tapnserve.net
                </a>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmitting)}
              className="md:col-span-8 p-3 md:px-10 theme"
            >
              <p className="bg-clip-text bg-gradient-to-r from-green-400 to-teal-600 text-xl  md:text-2xl mb-3 text-transparent">
                Send Us a Message{" "}
              </p>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="text" htmlFor="grid-first-name">
                    Fullname
                  </label>
                  <input
                    className="input"
                    id="grid-first-name"
                    type="text"
                    placeholder="Enter name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name?.type === "required" && "Tell us your name"}
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="text" htmlFor="grid-last-name">
                    Phone Number
                  </label>
                  <input
                    className="input"
                    id="grid-last-name"
                    type="number"
                    placeholder="0701 234 567"
                    {...register("phoneNo", {
                      required: true,
                      pattern: {
                        value: /^0\d{9}$/,
                        message: "Invalid phone number.",
                      },
                    })}
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNo?.type === "required" &&
                      "Phone Number is required"}
                    {errors.phoneNo?.type === "pattern" &&
                      errors.phoneNo.message}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="text" htmlFor="grid-password">
                    Email Address
                  </label>
                  <input
                    className="input"
                    id="grid-email"
                    type="email"
                    placeholder="********@*****.**"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.type === "required" && "Email is required"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="text" htmlFor="grid-password">
                    Your Message
                  </label>
                  <textarea
                    rows="5"
                    className="input"
                    {...register("message", {
                      required: true,
                    })}
                    placeholder="Type a message..."
                  ></textarea>
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message?.type === "required" &&
                      "Message is required"}
                  </p>
                </div>
                <div className="flex justify-center w-full px-3">
                  {loadingSend ? (
                    <p className="text-center text-primary">Sending...</p>
                  ) : (
                    <button
                      className="shadow bg-secondary hover:bg-opacity-80 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                      type="submit"
                    >
                      Send Message
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="my-5">
        <CTA2 />
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
