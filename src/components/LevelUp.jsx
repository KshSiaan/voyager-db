import React, { useEffect, useState } from "react";
import users from "../utils/users.json";
import { Image, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import level from "../assets/images/level2.png";
import trophy from "../assets/images/trophy.png";
import { fetchLevels, postLevel } from "../api/gamification";
import { useCookies } from "react-cookie";
function LevelUp() {
  const [isNewAvatarModalVisible, setIsNewAvatarModalVisible] = useState(false);
  const handleCreateAvatar = async () => {
    try {
      const readyData = {
        name: name,
        xp_to_unlock: "xp_to_unlock",
        value: xpNeeded,
      };

      const call = await postLevel(cookies.token, readyData);
      console.log(call);
    } catch (error) {
      console.error(error);
    }
    setIsNewAvatarModalVisible(false);
  };
  const handleCancelCreateAvatar = () => {
    setIsNewAvatarModalVisible(false);
  };

  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [xpNeeded, setXpNeeded] = useState(0);
  const [cookies] = useCookies(["token"]);

  const [res, setRes] = useState(null);
  const [levels, setLevels] = useState([]);

  const [name, setName] = useState("");
  // const [val, setVal] = useState(0);
  useEffect(() => {
    async function getLevels() {
      try {
        const call = await fetchLevels(cookies.token);
        console.log(call);
        const result = call.data.data;
        setRes(result);
        const levelDatas = call.data.data.data;
        setLevels(levelDatas);
      } catch (error) {
        console.error(error);
      }
    }
    getLevels();
  }, []);

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

  console.log("Selected level: ", selectedLevel);

  return (
    <div>
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
            Add new Level
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
            placeholder="Search Level"
            className="w-full py-4 text-black text-sm font-work"
            style={{ outline: "none" }}
          />
        </div>

        <h1 className={`text-subtitle text-sm font-work font-medium`}>
          Available levels ({res?.total})
        </h1>

        <div className={`grid grid-cols-3 mt-4 gap-2`}>
          {levels.map((user) => (
            <div
              className={`col-span-1 border border-gray90 flex flex-col justify-between rounded-2xl p-4`}
              key={user.id}
            >
              <div>
                <div className="flex flex-row justify-end">
                  {user?.photos ? (
                    user.photos
                  ) : (
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
                  )}
                </div>
                <div className={`flex flex-row items-center gap-2`}>
                  <div className={`w-full`}>
                    <img
                      src={level}
                      alt="Avatar"
                      className={`h-16 w-16 rounded-full`}
                    />
                  </div>
                  <div>
                    <h1
                      className={`text-title text-base font-medium mt-1 text-left font-work`}
                    >
                      {user.name}
                    </h1>
                    <p className={`text-gray100 text-sm font-work font-normal`}>
                      {user.xp_to_unlock}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex flex-row items-center justify-center mt-3 gap-1`}
                >
                  <img src={trophy} alt="coin" className={`h-6 w-6`} />
                  <p className={`text-gray300 text-xs font-bold font-work`}>
                    XP {user?.value}
                  </p>
                </div>
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
            Add New Level
          </h1>
          <div className="mt-6">
            <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
              Level
            </p>

            <input
              type="text"
              placeholder="Select Level"
              className={`focus:outline-none px-4 py-2 w-full border border-90 rounded-xl mb-2`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <div className={`flex flex-row items-center gap-4`}>
              <div
                className={`mb-3 border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
              >
                <input
                  type="text"
                  placeholder="XP to unlock"
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
            </div>

            <div className="mt-6">
              <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
                Upload Level photo
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
              Create Level
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LevelUp;
