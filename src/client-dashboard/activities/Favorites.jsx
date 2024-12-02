import { Tabs } from "@mantine/core";
import React from "react";
import LikeProfiles from "./components/LikeProfiles";
import FavoriteProfiles from "./components/FavoriteProfiles";
import FavoritedMeUsers from "./components/FavoritedMeUsers";

function Favorites() {
  return (
    <div>
      <div className="bg-primary/20 pt-[40px] md:pt-[40px] pb-10 px-3 md:px-8 xl:px-[100px] border-b-2 border-b-primary ">
        <div className="text-center ">
          <p className="text-xl font-bold text-gray-600">Favorites </p>
          <p className="text-gray-600 capitalize ">
            View who added you to favorite and users you added to favorite
          </p>
        </div>
      </div>
      <div className="mx-auto px-4 md:px-[100px] xl:px-[200px] py-6   ">
        <Tabs color="#FA812F" defaultValue="likedme">
          <Tabs.List className="px-2 bg-light ">
            <Tabs.Tab value="likedme">
              {" "}
              <p className="font-bold"> My Favorites </p>
            </Tabs.Tab>
            <Tabs.Tab value="mylikes">
              {" "}
              <p className="font-bold"> I'm Their Favorite </p>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="likedme">
            <FavoriteProfiles />
          </Tabs.Panel>

          <Tabs.Panel value="mylikes">
            <FavoritedMeUsers />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default Favorites;
