import React, { useEffect, useState } from "react";
import placeImg from "../assets/images/place.png";
import coin from "../assets/images/coin.png";
import trophy from "../assets/images/trophy.png";
import placeData from "../utils/place.json";
import { Image, Modal, notification, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import places from "../utils/places.json";
import {
  deleteQuest,
  fetchQuest,
  postQuest,
  refetchQuest,
} from "../api/gamification";
import { useCookies } from "react-cookie";

function Quests() {
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [createQuestModalVisible, setCreateQuestModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedValueOfChallanges, setSelectedValueOfChallanges] =
    useState("");
  const [api, contextHolder] = notification.useNotification();
  const [xpNeeded, setXpNeeded] = useState(0);
  const [selectedCertainACC, setSelectedCertainACC] = useState("");
  const [selectedACC, setSelectedACC] = useState("");
  const [cookies] = useCookies(["token"]);
  const [questData, setQuestData] = useState([]);
  const [res, setRes] = useState(null);

  const [qName, setQname] = useState("");
  const [qChallange, setQchallage] = useState("");
  const [qcoin, setQcoin] = useState("");
  const [qxp, setQxp] = useState("");
  const [selectedQuest, setSelectedQuest] = useState(null);

  const handleSaveCreateQuest = async () => {
    try {
      const readyData = {
        name: qName, //
        // icons: null,//
        launch_date: new Date().toISOString().split("T")[0], //
        challenge_id: 1, //
        end_date: "2025-12-17", //
        bonus_coins: qcoin, //
        bonus_xp: qxp, //
      };
      const call = await postQuest(cookies.token, readyData);
      console.log(call);

      // console.log(readyData);
    } catch (error) {
      console.error(error);
    }

    setCreateQuestModalVisible(false);
    api["success"]({
      message: `A new quest item has been added`,
      placement: "top",
      description: `Your quest item has been added successfully`,
    });
  };

  useEffect(() => {
    async function GetQuests() {
      try {
        const call = await fetchQuest(cookies.token);
        const quests = call.data.data.data;
        setQuestData(quests);
        const res = call.data.data;
        setRes(res);
        console.log(quests);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
    GetQuests();
  }, []);

  async function reFetch(link) {
    try {
      const call = await refetchQuest(cookies.token, link);
      const quests = call.data.data.data;
      setQuestData(quests);
      const res = call.data.data;
      setRes(res);
      console.log(quests);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteSelectedQuest() {
    if (selectedQuest) {
      try {
        const call = await deleteQuest(cookies.token, selectedQuest.id);
        console.log(call);
      } catch (error) {
        console.error(error);
      }
    } else {
      api["error"]({
        message: "Please select a quest first",
        placement: "top",
      });
    }
  }

  const handleOk = () => {
    setIsOptionModalVisible(false);
  };
  const handleCancel = () => {
    setIsOptionModalVisible(false);
  };

  const handleDelete = () => {
    try {
      deleteSelectedQuest();
    } catch (error) {
      console.error(error);
    }
    setIsDeleteModalVisible(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleCreateQuest = () => {
    setCreateQuestModalVisible(true);
  };
  const handleCancelCreateQuest = () => {
    setCreateQuestModalVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => {
        setPreviewImage(reader.result);
        setPreviewOpen(true);
      };
    } else {
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const chooseChallangesData = [
    { label: "Log in Times in a Week" },
    { label: "Earn Coins in a Week" },
    { label: "Buy a new avatar" },
    { label: "Buy a digital souvenir" },
    { label: "Invite Friends" },
    { label: "Add Destinations to the Bucketlist" },
    { label: "Have at least things on bucketlist" },
    { label: "Visit a New City" },
    { label: "Visit a New Country" },
    { label: "Visit an attraction in your city" },
    { label: "Visit a new attraction" },
    { label: "Visit a (category) of attraction" },
    { label: "Mark countries as visited" },
    { label: "Mark cities as visited" },
    { label: "Mark attractions as visited" },
    { label: "Proceed to the next level" },
    { label: "Proceed to the next level" },
    { label: "View certain attraction/city/country page" },
    { label: "Find a Voya Bear" },
  ];

  const filterPlace = () => {
    if (selectedCertainACC === "Attraction") {
      return places?.data?.attractions;
    }
    if (selectedCertainACC === "Cities") {
      return places?.data?.cities;
    }
    if (selectedCertainACC === "Country") {
      return places?.data?.countries;
    }
  };

  console.log("Checking data: ", filterPlace());
  return (
    <div>
      {contextHolder}
      <div className={`border-b border-dotted border-b-gray200 pb-6 mb-6`}>
        <div
          className={`border border-gray90 rounded-2xl justify-center h-36 w-36 flex flex-col items-center`}
        >
          <svg
            onClick={handleCreateQuest}
            className={`cursor-pointer`}
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18ZM16.8 26.4V19.2H9.6V16.8H16.8V9.6H19.2V16.8H26.4V19.2H19.2V26.4H16.8Z"
              fill="#8C78EA"
            />
          </svg>

          <h3
            className={`text-gray100 text-sm font-work font-medium mt-2 text-center`}
          >
            Create new quest
          </h3>
        </div>
      </div>
      <div>
        <div
          className={`my-4 border border-gray90 px-4 rounded-xl flex flex-row items-center gap-4`}
        >
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 15L10.5 11M6.5 13C3.18629 13 0.5 10.3137 0.5 7C0.5 3.68629 3.18629 1 6.5 1C9.81371 1 12.5 3.68629 12.5 7C12.5 10.3137 9.81371 13 6.5 13Z"
              stroke="#24272B"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Quest"
            className="w-full py-4 text-black text-sm font-work"
            style={{ outline: "none" }}
          />
        </div>

        <h1 className={`text-subtitle text-sm font-work font-medium`}>
          Created Quests ({res?.total})
        </h1>

        {questData.map((place) => (
          <div
            className={`py-3 border-b gap-4 border-b-gray90 grid grid-cols-12 `}
            key={place.id}
          >
            <div className={`col-span-8 flex gap-4 flex-row items-center`}>
              <img src={placeImg} alt="place" className={`w-24`} />
              <div>
                <h1
                  className={`text-title mb-2 text-base font-work font-medium`}
                >
                  {place?.title}
                </h1>

                <div className="mb-2">
                  <strong>Challange: </strong>{" "}
                  <span className="text-xs">
                    {place.name}{" "}
                    <strong>({place.count ? place.count : 0})</strong>
                  </span>
                </div>

                <div className={`flex flex-row items-center gap-4`}>
                  <div className={`flex flex-row items-center gap-1`}>
                    <img src={coin} alt="coin" className={`h-7 w-7`} />
                    <p className={`text-gray100 text-xs font-work font-normal`}>
                      {place?.bonus_coins} coins
                    </p>
                  </div>
                  <div className={`flex flex-row items-center gap-1`}>
                    <img src={trophy} alt="coin" className={`h-7 w-7`} />
                    <p className={`text-gray100 text-xs font-work font-normal`}>
                      {place?.bonus_xp} XP
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex flex-row items-center justify-end gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.5"
                  y="2.5"
                  width="15"
                  height="15"
                  rx="7.5"
                  stroke="#97C1A9"
                  stroke-width="5"
                />
              </svg>

              <span className={`text-black text-base font-work font-medium`}>
                {new Date(place.launch_date).toISOString().split("T")[0]}
              </span>
              <svg
                className={`cursor-pointer`}
                onClick={() => {
                  setSelectedQuest(place);
                  setIsOptionModalVisible(true);
                }}
                width="3"
                height="13"
                viewBox="0 0 3 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 2C1.22386 2 1 1.77614 1 1.5C1 1.22386 1.22386 1 1.5 1C1.77614 1 2 1.22386 2 1.5C2 1.77614 1.77614 2 1.5 2Z"
                  stroke="#24272B"
                />
                <path
                  d="M1.5 7C1.22386 7 1 6.77614 1 6.5C1 6.22386 1.22386 6 1.5 6C1.77614 6 2 6.22386 2 6.5C2 6.77614 1.77614 7 1.5 7Z"
                  stroke="#24272B"
                />
                <path
                  d="M1.5 12C1.22386 12 1 11.7761 1 11.5C1 11.2239 1.22386 11 1.5 11C1.77614 11 2 11.2239 2 11.5C2 11.7761 1.77614 12 1.5 12Z"
                  stroke="#24272B"
                />
              </svg>
            </div>
          </div>
        ))}
        <div className={`mt-8 flex-row flex items-center justify-between`}>
          <div>
            <h1 className={`text-black text-sm font-nunito font-bold`}>
              page {res?.current_page} of {res?.last_page}
            </h1>
          </div>
          <div className="flex flex-row items-center gap-3">
            <button
              className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer`}
              disabled={res?.prev_page_url ? true : false}
              onClick={() => {
                if (res?.next_page_url) {
                  reFetch(res?.next_page_url);
                }
              }}
            >
              Previous
            </button>
            <button
              className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer`}
              onClick={() => {
                reFetch(res?.next_page_url);
              }}
              disabled={res?.next_page_url ? true : false}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={isOptionModalVisible}
        width={350}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={`border-b border-dotted border-b-gray90 pb-4`}>
          <h1 className="text-title text-2xl font-work font-extrabold">
            Options
          </h1>
        </div>

        <div className="mt-4">
          <h1
            className={`text-title text-sm font-work font-bold cursor-pointer mb-2 hover:opacity-70`}
            onClick={() => {
              setIsOptionModalVisible(false);
              handleCreateQuest();
            }}
          >
            Edit
          </h1>
          <h1
            className={`text-danger text-sm font-work font-bold cursor-pointer hover:opacity-70`}
            onClick={() => {
              setIsOptionModalVisible(false);
              setIsDeleteModalVisible(true);
            }}
          >
            Delete Quest
          </h1>
        </div>
      </Modal>
      <Modal
        open={isDeleteModalVisible}
        width={350}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
      >
        <h1 className="text-title text-2xl font-work font-extrabold text-center">
          Delete Quest
        </h1>
        <p
          className={`text-gray100 text-sm font-work font-normal text-center mt-2`}
        >
          If you delete the quest, it will be permanently removed from your
          dashboard.
        </p>

        <div className={`flex flex-row items-center justify-between mt-6`}>
          <span
            className={`text-danger text-sm font-work rounded-xl font-semibold px-4 py-3 cursor-pointer`}
            onClick={handleDelete}
          >
            Delete
          </span>
          <span
            className={`text-white bg-primary rounded-xl text-sm font-work font-semibold px-4 py-3 cursor-pointer`}
            onClick={handleDeleteCancel}
          >
            Cancel
          </span>
        </div>
      </Modal>

      <Modal
        open={createQuestModalVisible}
        width={"80%"}
        onOk={handleCreateQuest}
        onCancel={handleCancelCreateQuest}
      >
        <div>
          <div className="border-b border-dotted border-b-gray90 pb-4">
            <h1 className="text-title text-2xl font-work font-extrabold">
              Add New Quest
            </h1>
            <div className="mt-6">
              <div>
                <p
                  className={`text-gray100 mb-2 text-sm font-work font-medium`}
                >
                  Weekly quest
                </p>

                <div className={`mb-3`}>
                  <input
                    type="text"
                    placeholder="Quest Name"
                    className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                    value={qName}
                    onChange={(e) => {
                      setQname(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row items-center gap-2 mb-3">
                <select
                  value={selectedValueOfChallanges}
                  className={`custom-select text-subtitle border border-90 focus:outline-none !px-4 py-2 rounded-2xl flex-1`}
                  onChange={(e) => {
                    setSelectedValueOfChallanges(e.target.value);
                  }}
                >
                  <option value="" className="" selected>
                    Choose challenges
                  </option>
                  {chooseChallangesData.map((item, index) => (
                    <option value={item?.label} className="" key={index}>
                      {item?.label}
                    </option>
                  ))}
                </select>

                {selectedValueOfChallanges ===
                "View certain attraction/city/country page" ? (
                  <select
                    value={selectedCertainACC}
                    className={`custom-select text-subtitle border border-90 focus:outline-none !px-4 py-2 rounded-2xl flex-1`}
                    onChange={(e) => setSelectedCertainACC(e.target.value)}
                  >
                    <option value="Choose Option" className="" selected>
                      Choose Option
                    </option>

                    <option value="Attraction" className="">
                      Attraction
                    </option>
                    <option value="Cities" className="">
                      Cities
                    </option>
                    <option value="Country" className="">
                      Country
                    </option>
                  </select>
                ) : selectedValueOfChallanges === "Log in Times in a Week" ||
                  selectedValueOfChallanges === "Earn Coins in a Week" ||
                  selectedValueOfChallanges === "Invite Friends" ||
                  selectedValueOfChallanges ===
                    "Add Destinations to the Bucketlist" ||
                  selectedValueOfChallanges ===
                    "Have at least things on bucketlist" ||
                  selectedValueOfChallanges === "asc" ? (
                  <div
                    className={`border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
                  >
                    <div
                      className={`rounded p-2 cursor-pointer`}
                      onClick={() => setXpNeeded(xpNeeded - 1)}
                    >
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 8H11M7.5 15C3.63401 15 0.5 11.866 0.5 8C0.5 4.13401 3.63401 1 7.5 1C11.366 1 14.5 4.13401 14.5 8C14.5 11.866 11.366 15 7.5 15Z"
                          stroke="#6C6E71"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={xpNeeded}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setXpNeeded(Number(value));
                        }
                      }}
                      className={`focus:outline-none px-4 py-2 rounded-xl w-full text-center`}
                    />
                    <div
                      className={`rounded p-2 cursor-pointer`}
                      onClick={() => setXpNeeded(xpNeeded + 1)}
                    >
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 4.5V11.5M4 8H11M7.5 15C3.63401 15 0.5 11.866 0.5 8C0.5 4.13401 3.63401 1 7.5 1C11.366 1 14.5 4.13401 14.5 8C14.5 11.866 11.366 15 7.5 15Z"
                          stroke="#6C6E71"
                        />
                      </svg>
                    </div>
                  </div>
                ) : null}
              </div>

              {(selectedCertainACC === "Attraction" ||
                selectedCertainACC === "Cities" ||
                selectedCertainACC === "Country") && (
                <div className="flex-1 mb-2">
                  <select
                    value={selectedACC}
                    className={`custom-select text-subtitle border border-90 focus:outline-none !px-4 py-2 rounded-2xl w-full`}
                    onChange={(e) => setSelectedACC(e.target.value)}
                  >
                    <option value="Choose Option" className="" selected>
                      Choose {selectedCertainACC}
                    </option>
                    {filterPlace()?.map((item, index) => {
                      return (
                        <option value={item?.name} className="" key={index}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {/* <div className={`mb-3`}>
                <p
                  className={`text-gray100 mb-2 text-sm font-work font-medium`}
                >
                  Quest launch date
                </p>

                <input
                  type="date"
                  placeholder=""
                  className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                />
              </div>
              <div className={`mb-3`}>
                <p
                  className={`text-gray100 mb-2 text-sm font-work font-medium`}
                >
                  Quest end date
                </p>

                <input
                  type="date"
                  placeholder=""
                  className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                />
              </div> */}
            </div>

            <div className="mt-6">
              <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
                Rewards
              </p>

              <div className={`mb-3`}>
                <input
                  type="text"
                  placeholder="Bonus Coins"
                  className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                  value={qcoin}
                  onChange={(e) => {
                    setQcoin(e.target.value);
                  }}
                />
              </div>
              <div className={`mb-3`}>
                <input
                  type="text"
                  placeholder="Bonus XP"
                  className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                  value={qxp}
                  onChange={(e) => {
                    setQxp(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
                Quest icon
              </p>

              <div className="flex flex-col items-start justify-start addQuestImageUpload">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length < 8 && (
                    <div>
                      <PlusOutlined color="rgba(0, 0, 0, 0.65)" />

                      <div style={{ marginTop: 8 }}>
                        <span className="text=gray100">Browse</span>
                      </div>
                    </div>
                  )}
                </Upload>
                {previewImage && (
                  <Image
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: () => setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
                <h1 className="text-subtitle text-sm font-work font-normal text-center mt-2">
                  Suggested weight 80 px & height 80 px
                </h1>
              </div>
            </div>
          </div>
          <div
            className={`mt-4 justify-between flex flex-row items-center gap-3`}
          >
            <button
              onClick={handleCancelCreateQuest}
              type="button"
              className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-danger"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCreateQuest}
              type="button"
              className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            >
              Save Quest
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Quests;
