import React, { useState } from "react";
import BestTimeToVisit from "./manageCategories/BestTimeToVisit";
import ActivityLevel from "./manageCategories/ActivityLevel";
import Categories from "./manageCategories/Categories";
import Keywords from "./manageCategories/Keywords";

function ManageCategory() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div className="w-full">
            <h1 className="text-black text-2xl font-semibold font-work mb-8">
              Manage Preference Category
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
              } text-sm font-work pb-2 font-semibold border-b-[2px] cursor-pointer`}
              onClick={() => setActiveTab(1)}
            >
              Category
            </span>
            <span
              className={`${
                activeTab === 2
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work pb-2 font-semibold border-b-[2px] cursor-pointer`}
              onClick={() => setActiveTab(2)}
            >
              Best time to visit
            </span>
            <span
              className={`${
                activeTab === 3
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work pb-2 font-semibold border-b-[2px] cursor-pointer`}
              onClick={() => setActiveTab(3)}
            >
              Activity level
            </span>
            <span
              className={`${
                activeTab === 4
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work pb-2 font-semibold border-b-[2px] cursor-pointer`}
              onClick={() => setActiveTab(4)}
            >
             Keywords
            </span>
          </div>

          {activeTab === 1 ? (
            <Categories />
          ) : activeTab === 2 ? (
            <BestTimeToVisit />
          ) : activeTab === 3 ? (
            <ActivityLevel />
          ): <Keywords />}
        </div>
      </div>
    </div>
  );
}

export default ManageCategory;
