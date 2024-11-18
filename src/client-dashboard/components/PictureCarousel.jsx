import React from "react";
import { Carousel } from "@mantine/carousel";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";

function PictureCarousel({ user, closeModal }) {
  const slides = user?.images.map((url) => (
    <Carousel.Slide key={url}>
      <img
        src={url || avatar}
        loading="lazy"
        alt=""
        className=" max-h-[400px] w-full object-cover  "
      />
    </Carousel.Slide>
  ));
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <div className="border-b-2 border-b-secondary mb-2  flex justify-between items-center">
        <div className="">
          <div className="flex gap-3 items-center">
            <Link onClick={closeModal} to={`/client/user/${user?._id}`}>
              <p className="font-bold capitalize ">{user?.userName}</p>
            </Link>
            <span className="p-1 cursor-pointer ">
              {" "}
              <FaRegMessage size={17} color="#FA812F" />
            </span>
          </div>

          <p>
            <span className="font-bold">{year - user?.dob}</span>{" "}
            {!user?.town && !user?.city ? (
              <span className="text-red-300"> Location Not Added</span>
            ) : (
              `${user?.town}, ${user?.city} `
            )}
          </p>
        </div>
        <div className="">
          <IoCloseSharp
            size={27}
            color="#FA812F"
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
      </div>
      <Carousel
        loop
        withIndicators
        align={"center"}
        height={"auto"}
        className="flex flex-col item-center"
      >
        {slides}
      </Carousel>
    </div>
  );
}

export default PictureCarousel;
