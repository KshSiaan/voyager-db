import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal";
import {
  addBestVisitTime,
  deleteBestVisitTime,
  getBestVisitTime,
} from "../../api/categories";
import { useCookies } from "react-cookie";
import { App } from "antd";

function BestTimeToVisit() {
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [bestTimeToVisits, setBestTimeToVisits] = useState([]);
  const [existingBTV, setExistingBTV] = useState([]);
  const [isDeleteCateModalVisible, setIsDeleteCateModalVisible] =
    useState(false);
  const [selectedDelete, setSelectedDelete] = useState("");
  const [selectedDeleteArr, setSelectedDeleteArr] = useState(null);
  const [cookies] = useCookies(["token"]);
  const { message } = App.useApp();

  const handleAddBestTimeToVisit = () => {
    if (bestTimeToVisit.trim() !== "") {
      if (!bestTimeToVisits.includes(bestTimeToVisit.trim())) {
        setBestTimeToVisits([...bestTimeToVisits, bestTimeToVisit.trim()]);
        setBestTimeToVisit("");
      } else {
        // Optionally, show a message to the user that the item already exists
        console.log("Item already exists!");
      }
    }
  };
  const handleRemoveBestTimeToVisit = (index) => {
    setBestTimeToVisits(bestTimeToVisits.filter((_, i) => i !== index));
  };
  const handleBestTimeToVisitChange = (e) => {
    setBestTimeToVisit(e.target.value);
  };

  const handleDelete = async () => {
    setIsDeleteCateModalVisible(false);
    if (selectedDelete === "" || !selectedDelete) {
      console.log("SOmething went wrong");
      return;
    }
    try {
      const call = await deleteBestVisitTime(cookies.token, selectedDelete);
      if (call.data.data.success) {
        setBestTimeToVisits((prev) =>
          prev.filter((item) => item !== selectedDeleteArr)
        );
        message.success(call.data.data.message);
      } else {
        console.log(call);
      }
    } catch (error) {
      console.error(error);
    }
    setSelectedDeleteArr(null);
    setSelectedDelete("");
  };
  const handleCancel = () => {
    setIsDeleteCateModalVisible(false);
  };

  useEffect(() => {
    async function getBests() {
      try {
        const call = await getBestVisitTime(cookies.token);
        const data = call.data.data;
        setExistingBTV(data);
      } catch (error) {
        console.error(error);
      }
    }
    getBests();
  }, [bestTimeToVisits]);

  const updateBTV = async () => {
    console.log(bestTimeToVisits);

    if (bestTimeToVisits.length === 0) return;
    if (!cookies.token) {
      console.error("Token is missing!");
      return;
    }

    try {
      const purifiedData = bestTimeToVisits.map((item) => ({
        name: item,
        icon: null,
      }));
      const finalData = { names: purifiedData };
      const call = await addBestVisitTime(cookies.token, finalData);

      if (!call || call.error) {
        console.error("API call failed:", call?.error || call);
        return;
      }

      console.log(call);
      setBestTimeToVisits([]);
    } catch (error) {
      console.error("Error in updateBTV:", error);
    }
  };

  return (
    <>
      <div className="mb-3 mt-4 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
        <input
          type="text"
          placeholder="Best time to visit"
          className="w-full focus:outline-none"
          value={bestTimeToVisit}
          onChange={handleBestTimeToVisitChange}
        />
        <button
          type="button"
          className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleAddBestTimeToVisit}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {bestTimeToVisits.map((activity, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-primary font-semibold">{activity}</span>
            <button
              className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
              onClick={() => {
                handleRemoveBestTimeToVisit(index);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
        onClick={() => {
          updateBTV();
        }}
      >
        Update
      </button>

      <div>
        <h2 className="text-black text-xl mt-3 mb-2 font-semibold">
          Your Best Time to Visit
        </h2>

        <div className="flex flex-wrap gap-2">
          {existingBTV.map((activity, index) => (
            <div
              key={index}
              className="flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-gray100 font-semibold">
                {activity.name}
              </span>
              <button
                className="ml-2 bg-gray100 text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => {
                  setIsDeleteCateModalVisible(true);
                  setSelectedDelete(activity.id);
                  setSelectedDeleteArr(index);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <DeleteModal
        handleOk={handleDelete}
        isVisible={isDeleteCateModalVisible}
        handleCancel={handleCancel}
        title={"Are you sure want to delete this visit time?"}
      />
    </>
  );
}

export default BestTimeToVisit;
