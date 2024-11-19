import { Tabs } from "@mantine/core";
import React from "react";
import LikeProfiles from "./components/LikeProfiles";

function Likes() {
  return (
    <div>
      <div className="bg-primary/20 pt-[40px] md:pt-[40px] pb-10 px-3 md:px-8 xl:px-[100px] border-b-2 border-b-primary ">
        <div className="text-center ">
          <p className="font-bold text-xl text-gray-600">Likes </p>
          <p className="text-gray-600 capitalize ">
            View who liked you and users you like
          </p>
        </div>
      </div>
      <div className="mx-auto px-4 md:px-[100px] xl:px-[200px] py-6   ">
        <Tabs color="#FA812F" defaultValue="likedme">
          <Tabs.List className="bg-light px-2 ">
            <Tabs.Tab value="likedme">
              {" "}
              <p className="font-bold">Liked Me</p>
            </Tabs.Tab>
            <Tabs.Tab value="mylikes">
              {" "}
              <p className="font-bold">My Likes</p>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="likedme">
            <LikeProfiles />
          </Tabs.Panel>

          <Tabs.Panel value="mylikes">
            <LikeProfiles />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default Likes;
