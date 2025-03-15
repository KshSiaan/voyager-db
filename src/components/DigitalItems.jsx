import React, { useEffect, useState } from "react";
import coin from "../assets/images/coin.png";
import users from "../utils/users.json";
import { Image, Modal, notification, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import locationImage from "../assets/images/ilustrations-location.png";
import countries from "../utils/location.json";
import { fetchDigitals, postDigitals } from "../api/gamification";
import { useCookies } from "react-cookie";

const chooseDigitalItemsType = [
  { label: "General" },
  { label: "Level specific" },
  { label: "Country specific" },
  { label: "Subscription specific" },
];

function DigitalItems() {
  const [isNewAvatarModalVisible, setIsNewAvatarModalVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [digitals, setDigitals] = useState([]);
  const [res, setRes] = useState([]);
  const [cookies] = useCookies(["token"]);
  const handleCreateAvatar = async () => {
    try {
      const readyData = {
        digital_item_types: dType,
        name: dName,
        cost: dCost,
        subscription_plan: "Free",
      };
      const call = await postDigitals(cookies.token, readyData);

      console.log(call);
    } catch (error) {}

    setIsNewAvatarModalVisible(false);
    api["success"]({
      message: `A new digital item has been added`,
      placement: "top",
      description: `Your digital item has been added successfully`,
    });
  };
  const handleCancelCreateAvatar = () => {
    setIsNewAvatarModalVisible(false);
  };

  useEffect(() => {
    async function GetDigitals() {
      try {
        const call = await fetchDigitals(cookies.token);
        const result = call.data.data;
        setRes(result);
        const digs = result.data;
        setDigitals(digs);
        console.log(digitals);
      } catch (error) {
        console.error(error);
      }
    }

    GetDigitals();
  }, []);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [chooseDigitalItemType, setChooseDigitalItemType] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [selectLevel, setSelectLevel] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [dType, setDtype] = useState("");
  const [dName, setDname] = useState("");
  const [dCost, setDcost] = useState("");

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
  return (
    <div>
      {contextHolder}
      <div className={`border-b border-dotted border-b-gray200 pb-6 mb-6`}>
        <div
          className={`border border-gray90 rounded-2xl justify-center h-36 w-36 flex flex-col items-center`}
        >
          <svg
            onClick={() => setIsNewAvatarModalVisible(true)}
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
            Create new item
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
            placeholder="Search Digital Items"
            className="w-full py-4 text-black text-sm font-work"
            style={{ outline: "none" }}
          />
        </div>

        <h1 className={`text-subtitle text-sm font-work font-medium`}>
          Created digital items ({users.total ? users.total : 0})
        </h1>

        <div className={`grid grid-cols-3 mt-4 gap-2`}>
          {digitals.map((user) => (
            <div
              className={`col-span-1 border border-gray90 flex flex-col justify-between rounded-2xl p-4`}
              key={user.id}
            >
              <div>
                <div className="flex flex-row justify-end">
                  <svg
                    className={`cursor-pointer`}
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
                <div className={`flex flex-row justify-center items-center`}>
                  <img
                    src={user?.avatar}
                    alt="Avatar"
                    className={`h-16 w-16 rounded-full`}
                  />
                </div>
                <h1
                  className={`text-title text-sm font-medium mt-1 text-center font-work`}
                >
                  {user.name}
                </h1>
              </div>
              <div className="flex flex-row justify-between items-center gap-2 mt-2">
                <div className="bg-gray90 py-1 px-2 rounded-xl">
                  <span className="text-gray100 text-xs font-work font-normal">
                    {user.country ? user.country : "--"}
                  </span>
                </div>
                <div className="bg-gray90 py-1 px-2 rounded-xl">
                  <span className="text-gray100 text-xs font-work font-normal">
                    {user.country ? user.country : "--"}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-row items-center justify-center mt-2 gap-1.5`}
              >
                <img src={coin} alt="coin" className={`h-6 w-6`} />
                <p className={`text-gray300 text-xs font-bold font-work`}>
                  {user?.cost}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-8 flex-row flex items-center justify-between`}>
          <div>
            <h1 className={`text-black text-sm font-nunito font-bold`}>
              page {res?.current_page} of {res?.last_page}
            </h1>
          </div>
          <div className="flex flex-row items-center gap-3">
            <button
              className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer`}
            >
              Previous
            </button>
            <button
              className={`border border-gray100 rounded-xl px-4 py-2 cursor-pointer`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={isNewAvatarModalVisible}
        width={"80%"}
        onCancel={handleCancelCreateAvatar}
        onOk={handleCreateAvatar}
      >
        <div className="border-b border-dotted border-b-gray90 pb-4">
          <h1 className="text-title text-2xl font-work font-extrabold">
            Add New Digital Item
          </h1>
          <div className="mt-6">
            <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
              Item type
            </p>

            <div className={`mb-3 flex flex-col items-end`}>
              <select
                onChange={(e) => {
                  setDtype(e.target.value);
                  setChooseDigitalItemType(e.target.value);
                }}
                className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
              >
                <option value="" className="">
                  Choose Digital Item type
                </option>
                {chooseDigitalItemsType.map((item, index) => (
                  <option value={item?.label} className="" key={index}>
                    {item?.label}
                  </option>
                ))}
              </select>
            </div>

            {chooseDigitalItemType === "Level specific" && (
              <div className={`mb-3`}>
                <select
                  onChange={(e) => setSelectLevel(e.target.value)}
                  className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
                >
                  <option value="" className="">
                    Select Level
                  </option>
                  {[...Array(10)].map((level, index) => (
                    <option
                      value={`${index + 1} level`}
                      className=""
                      key={index}
                    >
                      {index + 1} level
                    </option>
                  ))}
                </select>
              </div>
            )}

            {chooseDigitalItemType === "Country specific" && (
              <div className={`mb-3`}>
                <select
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
                >
                  <option value="" className="">
                    Choose Country
                  </option>
                  {countries?.countries?.map((country, index) => (
                    <option value={country?.name} className="" key={index}>
                      {country?.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {chooseDigitalItemType === "Subscription specific" && (
              <div className={`mb-3`}>
                <select
                  onChange={(e) => setSubscriptionPlan(e.target.value)}
                  className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
                >
                  <option value="" className="">
                    Select Subscription plan
                  </option>
                  <option value="Free" className="">
                    Free
                  </option>
                  <option value="Premium" className="">
                    Premium
                  </option>
                </select>
              </div>
            )}

            <div className={`mb-3`}>
              <input
                type="text"
                placeholder="Item Name"
                className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                value={dName}
                onChange={(e) => {
                  setDname(e.target.value);
                }}
              />
            </div>
            <div
              className={`mb-3 px-4 border border-90 rounded-xl flex flex-row items-center gap-2`}
            >
              <img src={coin} alt="coin" className={`h-6 w-6`} />
              <input
                type="text"
                placeholder="Item Cost"
                className={`focus:outline-none py-2 rounded-xl w-full`}
                value={dCost}
                onChange={(e) => {
                  setDcost(e.target.value);
                }}
              />
            </div>

            <div className="mt-6">
              <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
                Upload avatar
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
              onClick={handleCancelCreateAvatar}
              type="button"
              className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-danger"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAvatar}
              type="button"
              className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            >
              Save Digital Item
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DigitalItems;
