import React, { useState, useEffect } from "react";
import DeleteModal from "../DeleteModal";
import { useCookies } from "react-cookie";
import { App } from "antd";
// Assuming you have these functions like the ones in ActivityLevel
import { addKeyword, deleteKeyword, getKeywords } from "../../api/categories";

function Keywords() {
  const [isDeleteKeywordModalVisible, setIsDeleteKeywordModalVisible] =
    useState(false);
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [existingKeywords, setExistingKeywords] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState("");
  const [selectedDeleteArr, setSelectedDeleteArr] = useState(null);
  const [cookies] = useCookies(["token"]);
  const { message } = App.useApp();

  // Add new keyword
  const handleAddKeyword = () => {
    if (keyword.trim() !== "") {
      if (!keywords.includes(keyword.trim())) {
        setKeywords([...keywords, keyword.trim()]);
        setKeyword("");
      } else {
        console.log("Item already exists!");
      }
    }
  };

  // Remove keyword from list
  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  // Delete selected keyword
  const handleDeleteKeyword = async () => {
    setIsDeleteKeywordModalVisible(false);
    if (selectedDelete === "" || !selectedDelete) return;
    try {
      const call = await deleteKeyword(cookies.token, selectedDelete);
      if (call.data.data.success) {
        setExistingKeywords((prev) =>
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

  // Update keywords (submit to API)
  const updateKeywords = async () => {
    if (keywords.length === 0) return;
    if (!cookies.token) return console.error("Token is missing!");

    try {
      const finalData = { names: keywords.map((item) => ({ name: item })) };
      const call = await addKeyword(cookies.token, finalData);
      if (call.data.success) {
        setKeywords([]);
        message.success("Keywords updated successfully!");
      }
    } catch (error) {
      console.error("Error in updateKeywords:", error);
    }
  };

  // Fetch existing keywords
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const call = await getKeywords(cookies.token);
        setExistingKeywords(call.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchKeywords();
  }, [keywords]);

  return (
    <>
      {/* Input and Add Button */}
      <div className="mb-3 mt-4 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
        <input
          type="text"
          placeholder="Keyword"
          className="w-full focus:outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="button"
          className="rounded-xl px-4 py-2 cursor-pointer font-semibold text-white bg-primary"
          onClick={handleAddKeyword}
        >
          Add
        </button>
      </div>

      {/* Displaying Keywords */}
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-primary font-semibold">{keyword}</span>
            <button
              className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
              onClick={() => handleRemoveKeyword(index)}
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
        onClick={updateKeywords}
      >
        Update
      </button>

      {/* Existing Keywords */}
      <h2 className="text-xl mt-3 mb-2 font-semibold">Your Keywords</h2>
      <div className="flex flex-wrap gap-2">
        {existingKeywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary rounded-xl px-4 py-2"
          >
            <span className="text-gray100 font-semibold">{keyword.name}</span>
            <button
              className="ml-2 bg-gray100 text-white w-4 h-4 rounded-full font-bold text-[8px]"
              onClick={() => {
                setIsDeleteKeywordModalVisible(true);
                setSelectedDelete(keyword.id);
                setSelectedDeleteArr(index);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <DeleteModal
        handleOk={handleDeleteKeyword}
        isVisible={isDeleteKeywordModalVisible}
        handleCancel={() => setIsDeleteKeywordModalVisible(false)}
        title="Delete Keyword?"
      />
    </>
  );
}

export default Keywords;
