import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const ImageUpload = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

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
    <>
      <h1 className={`text-black text-[20px] font-work font-semibold mb-4`}>
        Upload Attraction Images
      </h1>
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
              <button className="rounded-xl px-2 py-0.5 cursor-pointer font-semibold font-work text-white bg-primary border border-primary">
                Browse
              </button>
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
    </>
  );
};

export default ImageUpload;
