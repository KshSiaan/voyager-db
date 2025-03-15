import React, { useEffect, useState } from "react";
import { Image, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import level from "../assets/images/tressure.png";
import { fetchBanner, postBanner } from "../api/communication";
import { useCookies } from "react-cookie";

function ShopBanner() {
  const [isNewAvatarModalVisible, setIsNewAvatarModalVisible] = useState(false);
  const handleCreateAvatar = async () => {
    try {
      const postableBanner = {
        photos: [],
        name: name,
        short_description: short_description,
      };

      const call = await postBanner(cookies.token, postableBanner);
      console.log(call);

      const updatedBanner = call.data.data;

      setBanner([updatedBanner]);
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
  const [cookies] = useCookies(["token"]);
  const [banner, setBanner] = useState([]);

  const [name, setName] = useState("");
  const [short_description, setShort_description] = useState("");

  useEffect(() => {
    async function getBanners() {
      try {
        const call = await fetchBanner(cookies.token);
        const bans = call.data.data;
        setBanner([bans]);
      } catch (error) {
        console.error(error);
      }
    }
    getBanners();
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
            Edit Banner
          </h3>
        </div>
      </div>
      <div>
        <h1 className={`text-subtitle text-sm font-work font-medium`}>
          Shop Banner
        </h1>

        <div className={`grid grid-cols-2 mt-4 gap-2`}>
          {banner.map((user, index) => (
            <div
              className={`col-span-1 border border-gray90 flex flex-col justify-between rounded-2xl p-4`}
              key={user.id}
            >
              <div>
                <div className={`flex flex-row items-center gap-2`}>
                  <div className={`w-full`}>
                    {user.photos &&
                      user.photos.map((item, index) => (
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
                      Shop: {user.name}
                    </h1>
                    <p className={`text-gray100 text-sm font-work font-normal`}>
                      {user.short_description}
                    </p>
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
            Update Shop Banner
          </h1>
          <div className="mt-6">
            <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
              Shop Banner
            </p>

            <div
              className={`mb-3 border border-90 rounded-xl flex flex-row items-center pr-4 flex-1`}
            >
              <input
                type="text"
                placeholder="Header Title"
                className={`focus:outline-none px-4 py-2 rounded-xl w-full`}
                value={name}
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div>
              <textarea
                id=""
                placeholder="Write a short description..."
                rows={8}
                className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
                value={short_description}
                name="short_description"
                onChange={(e) => {
                  setShort_description(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="mt-6">
              <p className={`text-gray100 mb-2 text-sm font-work font-medium`}>
                Upload Shop photo
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
              Update Shop Banner
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ShopBanner;
