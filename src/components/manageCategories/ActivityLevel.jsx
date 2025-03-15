import React, { useState, useEffect } from "react";
import DeleteModal from "../DeleteModal";
import { useCookies } from "react-cookie";
import {
  addActivityLevel,
  deleteActivityLevel,
  getActivityLevels,
} from "../../api/categories";
import { App } from "antd";

function ActivityLevel() {
  const [isDeleteCateModalVisible, setIsDeleteCateModalVisible] =
    useState(false);
  const [activityLevel, setActivityLevel] = useState("");
  const [activityLevels, setActivityLevels] = useState([]);
  const [existingLevels, setExistingLevels] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState("");
  const [selectedDeleteArr, setSelectedDeleteArr] = useState(null);
  const [cookies] = useCookies(["token"]);
  const { message } = App.useApp();

  const handleAddActivityLevel = () => {
    if (activityLevel.trim() !== "") {
      if (!activityLevels.includes(activityLevel.trim())) {
        setActivityLevels([...activityLevels, activityLevel.trim()]);
        setActivityLevel("");
      } else {
        console.log("Item already exists!");
      }
    }
  };

  const handleRemoveActivityLevel = (index) => {
    setActivityLevels(activityLevels.filter((_, i) => i !== index));
  };

  const handleDelete = async () => {
    setIsDeleteCateModalVisible(false);
    if (selectedDelete === "" || !selectedDelete) return;
    try {
      const call = await deleteActivityLevel(cookies.token, selectedDelete);
      if (call.data.data.success) {
        setExistingLevels((prev) =>
          prev.filter((_, i) => i !== selectedDeleteArr)
        );
        message.success(call.data.data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setSelectedDelete("");
    setSelectedDeleteArr(null);
  };

  const updateActivityLevels = async () => {
    if (activityLevels.length === 0) return;
    if (!cookies.token) return console.error("Token is missing!");

    try {
      const finalData = {
        names: activityLevels.map((item) => ({ name: item, icon: null })),
      };
      const call = await addActivityLevel(cookies.token, finalData);
      if (call.data.success) {
        setActivityLevels([]);
        message.success("Activity levels updated successfully!");
      }
    } catch (error) {
      console.error("Error in updateActivityLevels:", error);
    }
  };

  useEffect(() => {
    const fetchActivityLevels = async () => {
      try {
        const call = await getActivityLevels(cookies.token);
        setExistingLevels(call.data.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivityLevels();
  }, [activityLevels]);

  return (
    <>
      {/* Input and Add Button */}
      <div className="mb-3 mt-4 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
        <input
          type="text"
          placeholder="Activity Level"
          className="w-full focus:outline-none"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        />
        <button
          type="button"
          className="rounded-xl px-4 py-2 cursor-pointer font-semibold text-white bg-primary"
          onClick={handleAddActivityLevel}
        >
          Add
        </button>
      </div>

      {/* Displaying Activity Levels */}
      <div className="flex flex-wrap gap-2">
        {activityLevels.map((level, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-primary font-semibold">{level}</span>
            <button
              className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
              onClick={() => handleRemoveActivityLevel(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Update Button */}
      <button
        type="button"
        className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold text-white bg-primary"
        onClick={updateActivityLevels}
      >
        Update
      </button>

      {/* Existing Levels */}
      <h2 className="text-xl mt-3 mb-2 font-semibold">Your Activity Levels</h2>
      <div className="flex flex-wrap gap-2">
        {existingLevels.map((activity, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-gray100 font-semibold">{activity.name}</span>
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

      <DeleteModal
        handleOk={handleDelete}
        isVisible={isDeleteCateModalVisible}
        handleCancel={() => setIsDeleteCateModalVisible(false)}
        title="Delete Activity Level?"
      />
    </>
  );
}

export default ActivityLevel;
