import React, { useState } from "react";
import Quests from "./Quests";
import DigitalItems from "./DigitalItems";
import PowerUps from "./PowerUps";
import Achievements from "./Achievements";
import Avatar from "./Avatar";
import LevelUp from "./LevelUp";

function ManageQuests() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div className={`w-full`}>
            <h1 className="text-black text-2xl font-semibold font-work mb-8">
              Manage Gamification
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
              Quests
            </span>
            <span
              className={`${
                activeTab === 2
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work font-semibold border-b-[2px] pb-2 cursor-pointer`}
              onClick={() => setActiveTab(2)}
            >
              Avatars
            </span>
            <span
              className={`${
                activeTab === 3
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work font-semibold border-b-[2px] pb-2 cursor-pointer`}
              onClick={() => setActiveTab(3)}
            >
              Digital items
            </span>
            <span
              className={`${
                activeTab === 4
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work font-semibold border-b-[2px] pb-2 cursor-pointer`}
              onClick={() => setActiveTab(4)}
            >
              Power ups
            </span>
            <span
              className={`${
                activeTab === 5
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work font-semibold border-b-[2px] pb-2 cursor-pointer`}
              onClick={() => setActiveTab(5)}
            >
              Achievements
            </span>

            <span
              className={`${
                activeTab === 6
                  ? "text-primary border-b-primary"
                  : "text-title border-b-transparent"
              } text-sm font-work font-semibold border-b-[2px] pb-2 cursor-pointer`}
              onClick={() => setActiveTab(6)}
            >
              Levels
            </span>
          </div>

          <div className="mt-6">
            {activeTab === 1 ? (
              <Quests />
            ) : activeTab === 2 ? (
              <Avatar />
            ) : activeTab === 3 ? (
              <DigitalItems />
            ) : activeTab === 4 ? (
              <PowerUps />
            ) : activeTab === 5 ? (
              <Achievements />
            ) : activeTab === 6 ? (
              <LevelUp />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageQuests;
