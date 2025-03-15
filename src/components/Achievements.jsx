import React, { useEffect, useState } from "react";
import users from "../utils/users.json";
import { Image, Modal, notification, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import badge from "../assets/images/badges.png";
import { fetchAchivements, postAchivement } from "../api/gamification";
import { useCookies } from "react-cookie";

function Achievements() {
  const [api, contextHolder] = notification.useNotification();
  const [isNewAvatarModalVisible, setIsNewAvatarModalVisible] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [res, setRes] = useState(null);
  const [achives, setAchives] = useState([]);
  //
  const [name, setName] = useState("");
  const [option, setOption] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const handleCreateAvatar = async () => {
    try {
      const readyData = {
        name: name,
        choose_option: option,
        for_x: x,
        for_y: y,
        // photos: [],
      };
      // console.log(readyData);
      const call = await postAchivement(cookies.token, readyData);
      console.log(call);
      api["success"]({
        message: call.data.message,
        placement: "top",
        description: `Your achievement item has been added successfully`,
      });
    } catch (error) {
      console.error(error);
    }
    setIsNewAvatarModalVisible(false);
  };
  const handleCancelCreateAvatar = async () => {
    setIsNewAvatarModalVisible(false);
  };

  useEffect(() => {
    async function getAchives() {
      try {
        const call = await fetchAchivements(cookies.token);
        console.log(call);
        const response = call.data;
        setRes(response);
        const achs = call.data.data;
        setAchives(achs);
      } catch (error) {
        console.error(error);
      }
    }
    getAchives();
  }, []);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [xpNeeded, setXpNeeded] = useState(0);
  const [visitToUnlock, setVisitToUnlock] = useState("visit");

  const visitToUnlockOptions = [
    { label: "Mark x attractions as visited" },
    { label: "Mark x cities as visited" },
    { label: "Mark x countries as visited" },
    { label: "Mark x cities in Y countries as visited" },
    { label: "Mark x attractions in Y Country as visited" },
    { label: "Mark x Places in Y Categories as visited" },
    { label: "Mark x Places in Y subcategories as visited" },
    { label: "Mark x Places in Y Keywords as visited" },
    { label: "Mark x places in Y collections as visited" },
  ];

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
  console.log("selected input: ", visitToUnlock);
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
            Add new Achievements
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
            placeholder="Search Achievement"
            className="w-full py-4 text-black text-sm font-work"
            style={{ outline: "none" }}
          />
        </div>
        <h1 className={`text-subtitle text-sm font-work font-medium`}>
          Available power ups ({users.length})
        </h1>

        <div
          className={`grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-4 gap-2`}
        >
          {achives.map((user) => (
            <div
              className={`col-span-1 border border-gray90 flex flex-col justify-between rounded-2xl p-4`}
              key={user.id}
            >
              <div>
                <div className="flex flex-row justify-end">
                  {user.photos ? (
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
                      src={badge}
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
                      {user.choose_option}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-8 flex-row flex items-center justify-between`}>
          <div>
            <h1 className={`text-black text-sm font-nunito font-bold`}>
              page 1 of 10
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
            Add New Achievement
          </h1>
          <div className="mt-6">
            <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
              Badge
            </p>
            <div className={`mb-3`}>
              <input
                type="text"
                placeholder="Badge Name"
                className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div>
              <div className="flex flex-row items-center gap-2 mb-3">
                <div className="flex-1">
                  <p
                    className={`text-gray100 mb-2 text-sm font-work font-medium`}
                  >
                    Choose Option
                  </p>
                  <select
                    onChange={(e) => {
                      setVisitToUnlock(e.target.value);
                      setOption(e.target.value);
                    }}
                    className={`custom-select text-subtitle border border-90 focus:outline-none !px-4 py-2 rounded-2xl w-full`}
                  >
                    <option value="visit" className="">
                      Visit to unlock
                    </option>

                    {visitToUnlockOptions.map((option, index) => (
                      <option value={option?.label} className="" key={index}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                </div>

                {visitToUnlock !== "visit" && (
                  <div className="flex-1 flex-row flex gap-2">
                    <div className="flex-1">
                      <p
                        className={`text-gray100 mb-2 text-sm font-work font-medium`}
                      >
                        For X
                      </p>
                      <div
                        className={`border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
                      >
                        <div
                          className={`rounded p-2 cursor-pointer`}
                          onClick={() => setX(x - 1)}
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
                          value={x}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              setXpNeeded(Number(value));
                              setX(Number(value));
                            }
                          }}
                          className={`focus:outline-none px-4 py-2 rounded-xl w-full text-center`}
                        />
                        <div
                          className={`rounded p-2 cursor-pointer`}
                          onClick={() => setX(x + 1)}
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

                    {(visitToUnlock ===
                      "Mark x cities in Y countries as visited" ||
                      visitToUnlock ===
                        "Mark x attractions in Y Country as visited" ||
                      visitToUnlock ===
                        "Mark x Places in Y Categories as visited" ||
                      visitToUnlock ===
                        "Mark x Places in Y subcategories as visited" ||
                      visitToUnlock ===
                        "Mark x Places in Y Keywords as visited" ||
                      visitToUnlock ===
                        "Mark x places in Y collections as visited") && (
                      <div className="flex-1">
                        <p
                          className={`text-gray100 mb-2 text-sm font-work font-medium`}
                        >
                          For Y
                        </p>
                        <div
                          className={`border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
                        >
                          <div
                            className={`rounded p-2 cursor-pointer`}
                            onClick={() => setY(y - 1)}
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
                            value={y}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                // setXpNeeded(Number(value));
                                setY(Number(value));
                              }
                            }}
                            className={`focus:outline-none px-4 py-2 rounded-xl w-full text-center`}
                          />
                          <div
                            className={`rounded p-2 cursor-pointer`}
                            onClick={() => setY(y + 1)}
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
                    )}
                  </div>
                )}
              </div>
            </div>

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
              onClick={handleCreateAvatar}
              type="button"
              className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            >
              Save Achievement
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Achievements;
