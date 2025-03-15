import React from "react";

function RewardsAndGamification({ setForm }) {
  return (
    <div className={`border border-gray90 rounded-2xl p-4`}>
      <h1 className={`text-black text-[20px] font-work font-semibold`}>
        Set XP and Coins for the Attraction
      </h1>
      <form action="" className={`mt-4`}>
        <div className={`mb-3`}>
          <input
            type="text"
            placeholder="Number of XP"
            className={`border border-90 focus:outline-none px-4 py-4 mb-3 rounded-xl w-full`}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, xp: e.target.value }));
            }}
          />
        </div>
        <div className={`mb-3`}>
          <input
            type="text"
            placeholder="Number of Coins"
            className={`border border-90 focus:outline-none px-4 py-4 rounded-xl w-full`}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, coins: e.target.value }));
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default RewardsAndGamification;
