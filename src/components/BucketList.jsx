import React, { useEffect, useState } from "react";
import { App, Image, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import level from "../assets/images/speedmeter.png";
import coin from "../assets/images/coin.png";
import { useCookies } from "react-cookie";
import { fetchBucket, postBucket } from "../api/communication";

const cardStyle = [
  {
    value: null,
    label: "Select card style",
  },
  {
    value: "border only",
    label: "Border only",
  },
  {
    value: "border + fill",
    label: "Border + fill",
  },
  {
    value: "fill only",
    label: "Fill only",
  },
];

function BucketList() {
  const [isNewAvatarModalVisible, setIsNewAvatarModalVisible] = useState(false);

  const handleCancelCreateAvatar = () => {
    setIsNewAvatarModalVisible(false);
  };

  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [bucketlistSpaceCoins, setBucketlistSpaceCoins] = useState(0);
  const [selectedCardStyle, setSelectedCardStyle] = useState(null);
  const [unlockToEarn, setUnlockToEarn] = useState(0);
  const [bucketList, setBucketList] = useState([]);
  const [cookies] = useCookies(["token"]);

  const [name, setName] = useState("");
  const [short_description, setShort_description] = useState("");
  const [user_types, setUser_types] = useState("");
  const [bucketlist_space, setBucketlist_space] = useState("");
  const [unlock_to_earn_coin, setUnlock_to_earn_coin] = useState("");
  const [photos, setPhotos] = useState(null);

  const { message } = App.useApp();

  useEffect(() => {
    async function getBucks() {
      try {
        const call = await fetchBucket(cookies.token);

        const buckets = call.data.data.data;
        console.log(buckets);
        setBucketList(buckets);
      } catch (error) {
        console.error(error);
      }
    }
    getBucks();
  }, []);

  const handleCreateAvatar = async () => {
    const postableBucket = {
      name: name,
      short_description: short_description,
      user_types: user_types,
      bucketlist_space: bucketlistSpaceCoins,
      unlock_to_earn_coin: unlockToEarn,
      photos: null,
    };
    try {
      const call = await postBucket(cookies.token, postableBucket);
      console.log(call);
      message.success(name + " successfully added");
    } catch (error) {
      console.error(error);
    }

    setIsNewAvatarModalVisible(false);
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

  return (
    <div>
      <div className={`border-b border-dotted border-b-gray200 pb-6 mb-6`}>
        <div
          className={`border border-gray90 rounded-2xl justify-center h-36 w-36 flex flex-col items-center`}
        >
          <svg
            onClick={() => setIsNewAvatarModalVisible(true)}
            className={`cursor-pointer`}
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 23.7C4.45 23.7 3.979 23.504 3.587 23.112C3.19567 22.7207 3 22.25 3 21.7V7.69999C3 7.14999 3.19567 6.67899 3.587 6.28699C3.979 5.89565 4.45 5.69999 5 5.69999H13.925L11.925 7.69999H5V21.7H19V14.75L21 12.75V21.7C21 22.25 20.8043 22.7207 20.413 23.112C20.021 23.504 19.55 23.7 19 23.7H5ZM16.175 6.27499L17.6 7.67499L11 14.275V15.7H12.4L19.025 9.07499L20.45 10.475L13.25 17.7H9V13.45L16.175 6.27499ZM20.45 10.475L16.175 6.27499L18.675 3.77499C19.075 3.37499 19.5543 3.17499 20.113 3.17499C20.671 3.17499 21.1417 3.37499 21.525 3.77499L22.925 5.19999C23.3083 5.58332 23.5 6.04999 23.5 6.59999C23.5 7.14999 23.3083 7.61665 22.925 7.99999L20.45 10.475Z"
              fill="#8C78EA"
            />
          </svg>

          <h3
            className={`text-gray100 text-sm font-work font-medium mt-2 text-center`}
          >
            Edit Bucketlist
          </h3>
        </div>
      </div>
      <div>
        <h1 className={`text-subtitle text-sm font-work font-medium`}>
          Bucketlist
        </h1>

        <div className={`grid grid-cols-2 mt-4 gap-2`}>
          {bucketList?.map((user, index) => (
            <div
              className={`col-span-1 border border-gray90 flex flex-col justify-between rounded-2xl p-4`}
              key={user?.id}
            >
              <div>
                <div className={`flex flex-row items-center gap-2`}>
                  <div className={`w-full`}>
                    {user.photos?.map((item, index) => (
                      <img
                        src={item}
                        alt="Avatar"
                        className={`h-16 w-16 rounded-full`}
                        key={index}
                      />
                    ))}
                  </div>
                  <div>
                    <h1
                      className={`text-title text-base font-medium mt-1 text-left font-work`}
                    >
                      {user.name}
                    </h1>
                    <p className={`text-gray100 text-sm font-work font-normal`}>
                      {user.short_description}
                    </p>

                    <div className="mt-3">
                      <div className="mt-1">
                        <strong>For: </strong>{" "}
                        <span className="text-black">PowerUps</span>
                      </div>
                      <div className="mt-1">
                        <strong>Bucketlist Space: </strong>{" "}
                        <span className="text-black">
                          {user.bucketlist_space}
                        </span>
                      </div>
                      <div className="mt-1">
                        <strong>Card Style : </strong>{" "}
                        <span className="text-black">Border + fill</span>
                      </div>
                    </div>

                    <div className={`flex flex-row items-center mt-6`}>
                      <div className={`flex flex-row items-center gap-2`}>
                        <img src={coin} alt="coin" className={`h-7 w-7`} />
                        <span
                          className={`text-[#FFB961] text-lg font-work font-semibold`}
                        >
                          {user.unlock_to_earn_coin}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
            Update Bucketlist
          </h1>
          <div className="mt-6">
            <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
              Banner
            </p>

            <div
              className={`mb-3 border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
            >
              <input
                type="text"
                placeholder="Header Title"
                name="name"
                className={`focus:outline-none px-4 py-2 rounded-xl w-full`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div>
              <textarea
                name="short_description"
                id=""
                placeholder="Write a short description..."
                rows={8}
                className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                value={short_description}
                onChange={(e) => {
                  setShort_description(e.target.value);
                }}
              ></textarea>
            </div>

            <select
              className={`custom-select text-subtitle border mb-3 border-90 focus:outline-none !px-4 py-2 rounded-xl w-full`}
              value={user_types}
              name="user_types"
              onChange={(e) => {
                setSelectedUserType(e.target.value);
                setUser_types(e.target.value);
              }}
            >
              <option value="" className="" key={level.id}>
                User Type
              </option>

              <option value="Free" className="" key={level.id}>
                Free
              </option>
              <option value="Premium" className="" key={level.id}>
                Premium
              </option>
            </select>
            {selectedUserType === "Free" && (
              <>
                <div className={`flex flex-row items-center gap-4`}>
                  <div
                    className={`mb-3 border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
                  >
                    <input
                      type="text"
                      placeholder="Bucketlist Space"
                      disabled={true}
                      className={`focus:outline-none px-4 py-2 rounded-xl w-full`}
                    />
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 4.5C6.67157 4.5 6 5.17157 6 6V6.5H9V6C9 5.17157 8.32843 4.5 7.5 4.5Z"
                        fill="#24272B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 0.5C11.6421 0.5 15 3.85786 15 8C15 12.1421 11.6421 15.5 7.5 15.5C3.35786 15.5 -2.54447e-06 12.1421 0 8C0 3.85786 3.35786 0.499997 7.5 0.5ZM5 6V6.58535C4.4174 6.79127 4 7.34689 4 8V11C4 11.8284 4.67157 12.5 5.5 12.5H9.5C10.3284 12.5 11 11.8284 11 11V8C11 7.34689 10.5826 6.79127 10 6.58535V6C10 4.61929 8.88071 3.5 7.5 3.5C6.11929 3.5 5 4.61929 5 6Z"
                        fill="#24272B"
                      />
                    </svg>
                  </div>
                  <div
                    className={`mb-3 border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
                  >
                    <div
                      className={`rounded p-2 cursor-pointer`}
                      onClick={() =>
                        setBucketlistSpaceCoins(bucketlistSpaceCoins - 1)
                      }
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
                      value={bucketlistSpaceCoins}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setBucketlistSpaceCoins(Number(value));
                        }
                      }}
                      className={`focus:outline-none px-4 py-2 rounded-xl w-full text-center`}
                    />
                    <div
                      className={`rounded p-2 cursor-pointer`}
                      onClick={() =>
                        setBucketlistSpaceCoins(bucketlistSpaceCoins + 1)
                      }
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
                </div>

                <div className={`flex flex-row items-center gap-4`}>
                  <div
                    className={`mb-3 border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
                  >
                    <input
                      type="text"
                      placeholder="Unlock to Earn (Coins)"
                      disabled={true}
                      className={`focus:outline-none px-4 py-2 rounded-xl w-full`}
                    />
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 4.5C6.67157 4.5 6 5.17157 6 6V6.5H9V6C9 5.17157 8.32843 4.5 7.5 4.5Z"
                        fill="#24272B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 0.5C11.6421 0.5 15 3.85786 15 8C15 12.1421 11.6421 15.5 7.5 15.5C3.35786 15.5 -2.54447e-06 12.1421 0 8C0 3.85786 3.35786 0.499997 7.5 0.5ZM5 6V6.58535C4.4174 6.79127 4 7.34689 4 8V11C4 11.8284 4.67157 12.5 5.5 12.5H9.5C10.3284 12.5 11 11.8284 11 11V8C11 7.34689 10.5826 6.79127 10 6.58535V6C10 4.61929 8.88071 3.5 7.5 3.5C6.11929 3.5 5 4.61929 5 6Z"
                        fill="#24272B"
                      />
                    </svg>
                  </div>
                  <div
                    className={`mb-3 border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
                  >
                    <div
                      className={`rounded p-2 cursor-pointer`}
                      onClick={() => setUnlockToEarn(unlockToEarn - 1)}
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
                      value={unlockToEarn}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setUnlockToEarn(Number(value));
                        }
                      }}
                      className={`focus:outline-none px-4 py-2 rounded-xl w-full text-center`}
                    />
                    <div
                      className={`rounded p-2 cursor-pointer`}
                      onClick={() => setUnlockToEarn(unlockToEarn + 1)}
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
                </div>
              </>
            )}

            <select
              className={`custom-select text-subtitle border mb-3 border-90 focus:outline-none !px-4 py-2 rounded-xl w-full`}
              onChange={(e) => setSelectedCardStyle(e.target.value)}
            >
              {cardStyle.map((style) => (
                <option value={style.value} className="" key={style.id}>
                  {style.label}
                </option>
              ))}
            </select>

            <div className="mt-6">
              <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
                Upload Bucketlist photo
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
              Update Bucketlist
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BucketList;
