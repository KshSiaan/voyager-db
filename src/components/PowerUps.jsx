import React, { useEffect, useState } from "react";
import coin from "../assets/images/coin.png";
import users from "../utils/users.json";
import { Image, Modal, notification, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import locationImage from "../assets/images/ilustrations-location.png";
import { fetchPowers, postPowers } from "../api/gamification";
import { useCookies } from "react-cookie";

const choosePowerUpsOptions = [
  { label: "Boost XP" },
  { label: "Time Travelers Clock" },
];

function PowerUps() {
  const [isNewAvatarModalVisible, setIsNewAvatarModalVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [cookies] = useCookies(["token"]);
  const [powers, setPowers] = useState([]);
  const [res, setRes] = useState(null);

  const [pDuration, setPduration] = useState("");
  const [pCost, setPcost] = useState("");
  const [pDesc, setPdesc] = useState("");
  const [pxp, setPxp] = useState("");
  const handleCreatePowerUps = async () => {
    try {
      const readyData = {
        option: choosePowerUps,
        cost: pCost,
        duration: pDuration,
        short_description: pDesc,
        boost_xp: pxp,
        // avatar:null
      };
      const call = await postPowers(cookies.token, readyData);
      console.log(call);
      api["success"]({
        message: call.data.message,
        placement: "top",
        description: `Your power ups item has been added successfully`,
      });
    } catch (error) {
      console.error(error);
    }

    setIsNewAvatarModalVisible(false);
  };
  const handleCancelCreateAvatar = () => {
    setIsNewAvatarModalVisible(false);
  };

  useEffect(() => {
    async function GetPowers() {
      try {
        const call = await fetchPowers(cookies.token);
        const result = call.data.data;
        setRes(result);
        const powerDatas = call.data.data.data;
        setPowers(powerDatas);
        console.log();
      } catch (error) {
        console.error(error);
      }
    }
    GetPowers();
  }, []);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [choosePowerUps, setChoosePowerUps] = useState("");

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
            Add new power ups
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
            placeholder="Search Power Ups"
            className="w-full py-4 text-black text-sm font-work"
            style={{ outline: "none" }}
          />
        </div>

        <h1 className={`text-subtitle text-sm font-work font-medium`}>
          Available power ups ({res?.total ? res.total : "0"})
        </h1>

        <div className={`grid grid-cols-3 mt-4 gap-2`}>
          {powers.map((user) => (
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
                <div className="flex-col items-center flex">
                  <img
                    src={user?.avatar}
                    alt="Avatar"
                    className={`h-16 w-16 rounded-full`}
                  />
                </div>
                <div className={`flex flex-row items-center gap-2`}>
                  <div className="">
                    <h1
                      className={`text-title text-center text-sm font-medium mt-1 font-work`}
                    >
                      {user?.country}
                    </h1>
                    <p
                      className={`text-gray100 text-center mt-1 text-sm font-work font-normal`}
                    >
                      {user?.short_description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-row flex items-center justify-between mt-3">
                <div className={`flex flex-row items-center gap-1`}>
                  <p className={`text-black text-xs font-work font-medium`}>
                    Multiply XP {user?.boost_xp} Times
                  </p>
                </div>
                <div className={`flex flex-row items-center gap-1`}>
                  <p className={`text-black text-xs font-work font-medium`}>
                    {user?.duration} Days
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-row items-center justify-center mt-3 gap-1`}
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
        onOk={handleCreatePowerUps}
      >
        <div className="border-b border-dotted border-b-gray90 pb-4">
          <h1 className="text-title text-2xl font-work font-extrabold">
            Add New Power-Ups
          </h1>
          <div className="mt-6">
            <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
              Details
            </p>

            <div className={`mb-3 flex flex-col items-end`}>
              <select
                onChange={(e) => setChoosePowerUps(e.target.value)}
                className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
              >
                <option value="" className="">
                  Choose Power ups option
                </option>
                {choosePowerUpsOptions.map((item, index) => (
                  <option value={item?.label} className="" key={index}>
                    {item?.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={`mb-3 flex flex-col items-end`}>
              <select
                onChange={(e) => setPduration(e.target.value)}
                className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
              >
                <option value="" className="">
                  Choose {choosePowerUps} duration
                </option>
                {[...Array(7)].map((item, index) => (
                  <option value={`${index + 1}`} className="" key={index}>
                    {index + 1} {index > 0 ? "Days" : "Day"}
                  </option>
                ))}
              </select>
            </div>

            {choosePowerUps === "Boost XP" && (
              <div className={`mb-3 flex flex-col items-end`}>
                <div
                  className={`mb-3 px-4 border border-90 rounded-xl w-full flex-row items-center gap-2`}
                >
                  <input
                    type="text"
                    placeholder="Boost XP"
                    className={`focus:outline-none py-2 rounded-xl w-full`}
                    value={pxp}
                    onChange={(e) => {
                      setPxp(e.target.value);
                    }}
                  />
                </div>
              </div>
            )}

            <div
              className={`mb-3 px-4 border border-90 rounded-xl flex flex-row items-center gap-2`}
            >
              <img src={coin} alt="coin" className={`h-6 w-6`} />
              <input
                type="text"
                placeholder="Cost"
                className={`focus:outline-none py-2 rounded-xl w-full`}
                value={pCost}
                onChange={(e) => {
                  setPcost(e.target.value);
                }}
              />
            </div>

            <textarea
              rows="5"
              placeholder="Write a short description..."
              className="focus:outline-none p-4 w-full border border-90 rounded-2xl"
              value={pDesc}
              onChange={(e) => {
                setPdesc(e.target.value);
              }}
            ></textarea>

            <div className="mt-6">
              <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
                Upload photo
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
              onClick={handleCreatePowerUps}
              type="button"
              className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            >
              Save Power Ups
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PowerUps;
