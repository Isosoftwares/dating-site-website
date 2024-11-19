import React from "react";
import SubscriptionPackages from "./components/SubscriptionPackages";

function Subscriptions() {
  return (
    <div>
      <div className="bg-primary/20 pt-[40px] md:pt-[40px] pb-10 px-3 md:px-8 xl:px-[100px] border-b-2 border-b-primary ">
        <div className="text-center ">
          <p className="font-bold text-xl text-gray-600">
            Upgrade you LoveAlto Membership!😍{" "}
          </p>
          <p className="text-gray-600 capitalize ">
            Unlock all features! Messaging, profile views and much more!
          </p>
        </div>
      </div>
      <div className="  ">
        <div className="mx-auto px-4 md:px-[100px] xl:px-[200px]   ">
          <SubscriptionPackages />
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
