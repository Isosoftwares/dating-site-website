import { Tabs } from "@mantine/core";
import React from "react";
import LikeProfiles from "./components/LikeProfiles";
import FavoriteProfiles from "./components/FavoriteProfiles";
import ProfileViewsprofiles from "./components/ProfileViewsprofiles";

function ProfileViews() {
  return (
    <div>
      <div className="bg-primary/20 pt-[40px] md:pt-[40px] pb-10 px-3 md:px-8 xl:px-[100px] border-b-2 border-b-primary ">
        <div className="text-center ">
          <p className="font-bold text-xl text-gray-600">Profile Views </p>
          <p className="text-gray-600 capitalize ">
            View who viewed you and users you viewed
          </p>
        </div>
      </div>
      <div className="mx-auto px-4 md:px-[100px] xl:px-[200px] py-6   ">
        <Tabs color="#FA812F" defaultValue="likedme">
          <Tabs.List className="bg-light px-2 ">
            <Tabs.Tab value="likedme">
              {" "}
              <p className="font-bold"> Viewed My </p>
            </Tabs.Tab>
            <Tabs.Tab value="mylikes">
              {" "}
              <p className="font-bold">Profiles I Viewed </p>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="likedme">
            <ProfileViewsprofiles />
          </Tabs.Panel>

          <Tabs.Panel value="mylikes">
            <ProfileViewsprofiles />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfileViews;
