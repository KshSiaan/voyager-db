import React, { useState } from "react";
import BucketList from "./BucketList";
import ShopBanner from "./ShopBanner";

function Communications() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div className={`w-full`}>
            <h1 className="text-black text-2xl font-semibold font-work mb-8">
            Communications
            </h1>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-4">
            <span
              className={`${
                activeTab === 1
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work font-semibold border-b-[2px] pb-2 cursor-pointer`}
              onClick={() => setActiveTab(1)}
            >
              Bucketlist Banner
            </span>
            <span
              className={`${
                activeTab === 2
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work font-semibold border-b-[2px] pb-2 cursor-pointer`}
              onClick={() => setActiveTab(2)}
            >
              Shop Banner
            </span>
          </div>

          <div className="mt-6">
            {activeTab === 1 ? (
              <BucketList />
            ) : activeTab === 2 ? (
              <ShopBanner />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communications;
