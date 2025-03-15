import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
// import users from "../utils/users.json";
import { App, Modal } from "antd";
import coin from "../assets/images/coin.png";
import badges from "../assets/images/badges.png";
import level from "../assets/images/level.png";
import trophy from "../assets/images/trophy.png";
import DeleteModal from "./DeleteModal";
import avatar from "../assets/images/avatar.png";
import mapBag from "../assets/images/map-bag.png";
import place from "../assets/images/place.png";
import { useCookies } from "react-cookie";
import {
  deleteUserRequest,
  fetchUsers,
  resetUserPass,
  suspendUserRequest,
} from "../api/users";

function User() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [searchData, setSearchData] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfrimPassword] = useState(false);
  const [bucketList, setBucketList] = useState(0);
  const [cookie] = useCookies(["token"]);
  const [selectedUserID, setSelectedUser] = useState();
  const [users, setUser] = useState([]);
  useEffect(() => {
    console.log(selectedUserID);
  }, [selectedUserID]);
  const openEditModal = ({ id }) => {
    setSelectedUser(id);
    setIsEditModalVisible(true);
  };
  const closeResetModal = () => {
    setSelectedUser(null);
    setIsEditModalVisible(false);
  };
  const [formData, setFormData] = useState({
    new_password: "",
    c_password: "",
  });
  // const [data, setData] = useState([]);
  const { message } = App.useApp();
  const handleUserProfile = (user) => {
    setShowProfileModal(true);
    setProfileData(user);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const datas = await fetchUsers(cookie.token);
        // setUser(data);
        setUser(datas.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (users) {
      console.log(users);
    }
  }, [users]);

  const filteredUsers = (users ?? []).filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchData.toLowerCase()) ||
      user.email.toLowerCase().includes(searchData.toLowerCase())
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeleteUser = () => {
    deleteUser();
    setIsDeleteModalVisible(false);
  };

  //Data Validations:

  const handleSubmit = async (e) => {
    e.preventDefault();

    //* Reset Password submit event

    try {
      const call = await resetUserPass(cookie.token, formData, selectedUserID);
      message.success(call.message);

      setFormData({ new_password: "", c_password: "" });

      setSelectedUser(null);
      console.log(call);
    } catch (error) {
      console.log(error);
    }
  };

  const suspendUser = async () => {
    try {
      const call = await suspendUserRequest(cookie.token, selectedUserID);
      message.success(call.message);
      setIsEditModalVisible(false);
      console.log(call);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const call = await deleteUserRequest(cookie.token, selectedUserID);
      message.success(call.message);
      if (isEditModalVisible) {
        setIsEditModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div className={`w-full`}>
            <h1 className="text-black text-2xl font-semibold font-work mb-8">
              User Activities
            </h1>

            <div
              className={`border border-90 px-4 mb-6 py-4 rounded-xl flex flex-row items-center gap-2`}
            >
              <SearchOutlined color="#24272B" />
              <input
                type="text"
                name=""
                id=""
                className=" focus:outline-none w-full"
                placeholder="Search user by their name or email..."
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>

            <table className="table-auto w-full">
              <thead className="bg-gray90 rounded-xl">
                <tr className="h-12">
                  <th className="text-left pl-4 text-gray300 text-xs font-work font-medium">
                    User & ID ({users?.length})
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    E-mail
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Country
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Sign up date
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Last login date
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    User type
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Status
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((item) => (
                  <tr
                    className="border-b border-b-[#E9E9EA] py-2 gap-y-2 cursor-pointer"
                    key={item?.id}
                  >
                    <td className="pl-4 flex flex-row items-center gap-2">
                      <div className="py-2">
                        <img
                          src={item?.image}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <h1
                          className={`text-title text-sm font-work font-normal`}
                        >
                          {item?.full_name}
                        </h1>
                        <h1
                          className={`text-[#475467] text-sm font-work font-normal`}
                        >
                          {item?.email}
                        </h1>
                      </div>
                    </td>
                    <td>{item?.email}</td>
                    <td>
                      <div className="flex flex-row gap-2 items-center">
                        {item.origin ? (
                          <img
                            src={`https://flagsapi.com/${
                              item?.origin ? "" : "US"
                            }/flat/64.png`}
                            className="w-7 h-7"
                            alt={item?.country}
                          />
                        ) : (
                          ""
                        )}
                        <span className="text-[#101828] text-sm font-Work font-medium">
                          {item?.country ? item?.country : "Not Found"}
                        </span>
                      </div>
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("en-CA").format(
                        new Date(item?.signup_date)
                      )}
                    </td>

                    <td>
                      {new Intl.DateTimeFormat("en-CA").format(
                        new Date(item?.last_login_date)
                      )}
                    </td>
                    <td>{item?.user_type}</td>
                    <td>
                      <div className="flex flex-row items-center">
                        <div
                          className={`${
                            item?.status === "active"
                              ? "bg-[#F5F9F6] text-[#6B8978]"
                              : "bg-[#FFEFF3] text-[#B34261]"
                          } px-3 py-1 rounded-2xl`}
                        >
                          {item?.status === "active" ? "Active" : "Suspended"}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-row items-center gap-2">
                        <svg
                          onClick={() => {
                            setSelectedUser(item.id);
                            setIsDeleteModalVisible(true);
                          }}
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.167 13.5V12C15.167 11.4477 15.6147 11 16.167 11H20.167C20.7193 11 21.167 11.4477 21.167 12V13.5M10.667 14H25.667M12.167 14V24C12.167 24.5523 12.6147 25 13.167 25H23.167C23.7193 25 24.167 24.5523 24.167 24V14M18.167 17.5V22.5M15.167 19.5V22.5M21.167 19.5V22.5"
                            stroke="#6C6E71"
                          />
                        </svg>

                        <svg
                          onClick={() => {
                            openEditModal(item);
                          }}
                          width="48"
                          height="36"
                          viewBox="0 0 48 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.167 20L16.8134 19.6464L16.667 19.7929V20H17.167ZM26.167 11L26.5205 10.6464C26.3253 10.4512 26.0087 10.4512 25.8134 10.6464L26.167 11ZM31.167 16L31.5205 16.3536C31.7158 16.1583 31.7158 15.8417 31.5205 15.6464L31.167 16ZM22.167 25V25.5H22.3741L22.5205 25.3536L22.167 25ZM17.167 25H16.667C16.667 25.2761 16.8908 25.5 17.167 25.5V25ZM17.5205 20.3536L26.5205 11.3536L25.8134 10.6464L16.8134 19.6464L17.5205 20.3536ZM25.8134 11.3536L30.8134 16.3536L31.5205 15.6464L26.5205 10.6464L25.8134 11.3536ZM30.8134 15.6464L21.8134 24.6464L22.5205 25.3536L31.5205 16.3536L30.8134 15.6464ZM22.167 24.5H17.167V25.5H22.167V24.5ZM17.667 25V20H16.667V25H17.667ZM22.8134 14.3536L27.8134 19.3536L28.5205 18.6464L23.5205 13.6464L22.8134 14.3536ZM24.667 25.5H31.667V24.5H24.667V25.5Z"
                            fill="#6C6E71"
                          />
                        </svg>

                        <svg
                          onClick={() => handleUserProfile(item)}
                          width="48"
                          height="36"
                          viewBox="0 0 48 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.167 18L16.7028 17.8143C16.6551 17.9335 16.6551 18.0665 16.7028 18.1857L17.167 18ZM31.167 18L31.6312 18.1857C31.6789 18.0665 31.6789 17.9335 31.6312 17.8143L31.167 18ZM24.167 22.5C21.853 22.5 20.2281 21.3483 19.1636 20.1655C18.631 19.5738 18.2451 18.9803 17.9926 18.5347C17.8667 18.3125 17.7747 18.1284 17.715 18.0016C17.6851 17.9383 17.6633 17.8894 17.6495 17.8573C17.6425 17.8413 17.6375 17.8295 17.6345 17.8222C17.633 17.8186 17.632 17.8161 17.6314 17.8148C17.6311 17.8141 17.631 17.8137 17.631 17.8136C17.6309 17.8136 17.631 17.8136 17.631 17.8138C17.631 17.8138 17.6311 17.8139 17.6311 17.814C17.6312 17.8141 17.6312 17.8143 17.167 18C16.7028 18.1857 16.7028 18.1859 16.7029 18.1861C16.703 18.1862 16.7031 18.1865 16.7032 18.1867C16.7033 18.1871 16.7035 18.1876 16.7038 18.1882C16.7042 18.1893 16.7048 18.1907 16.7055 18.1925C16.7069 18.196 16.7088 18.2006 16.7113 18.2064C16.7161 18.2181 16.723 18.2344 16.7319 18.255C16.7497 18.2961 16.7758 18.3547 16.8104 18.4281C16.8796 18.5747 16.9829 18.7813 17.1226 19.0278C17.4014 19.5197 17.8279 20.1762 18.4203 20.8345C19.6059 22.1517 21.481 23.5 24.167 23.5V22.5ZM17.167 18C17.6312 18.1857 17.6312 18.1859 17.6311 18.186C17.6311 18.1861 17.631 18.1862 17.631 18.1862C17.631 18.1864 17.6309 18.1864 17.631 18.1864C17.631 18.1863 17.6311 18.1859 17.6314 18.1852C17.632 18.1839 17.633 18.1814 17.6345 18.1778C17.6375 18.1705 17.6425 18.1587 17.6495 18.1427C17.6633 18.1106 17.6851 18.0617 17.715 17.9984C17.7747 17.8716 17.8667 17.6875 17.9926 17.4653C18.2451 17.0197 18.631 16.4262 19.1636 15.8345C20.2281 14.6517 21.853 13.5 24.167 13.5V12.5C21.481 12.5 19.6059 13.8483 18.4203 15.1655C17.8279 15.8238 17.4014 16.4803 17.1226 16.9722C16.9829 17.2187 16.8796 17.4253 16.8104 17.5719C16.7758 17.6453 16.7497 17.7039 16.7319 17.745C16.723 17.7656 16.7161 17.7819 16.7113 17.7936C16.7088 17.7994 16.7069 17.804 16.7055 17.8075C16.7048 17.8093 16.7042 17.8107 16.7038 17.8118C16.7035 17.8124 16.7033 17.8129 16.7032 17.8133C16.7031 17.8135 16.703 17.8138 16.7029 17.8139C16.7028 17.8141 16.7028 17.8143 17.167 18ZM24.167 13.5C26.481 13.5 28.1059 14.6517 29.1703 15.8345C29.7029 16.4262 30.0889 17.0197 30.3414 17.4653C30.4673 17.6875 30.5593 17.8716 30.619 17.9984C30.6489 18.0617 30.6706 18.1106 30.6845 18.1427C30.6915 18.1587 30.6964 18.1705 30.6995 18.1778C30.701 18.1814 30.702 18.1839 30.7026 18.1852C30.7028 18.1859 30.703 18.1863 30.703 18.1864C30.703 18.1864 30.703 18.1864 30.703 18.1863C30.703 18.1862 30.7029 18.1861 30.7029 18.186C30.7028 18.1859 30.7028 18.1857 31.167 18C31.6312 17.8143 31.6311 17.8141 31.6311 17.8139C31.631 17.8138 31.6309 17.8135 31.6308 17.8133C31.6307 17.8129 31.6305 17.8124 31.6302 17.8118C31.6298 17.8107 31.6292 17.8093 31.6285 17.8075C31.6271 17.804 31.6252 17.7994 31.6227 17.7936C31.6179 17.7819 31.611 17.7656 31.6021 17.745C31.5842 17.7039 31.5581 17.6453 31.5236 17.5719C31.4544 17.4253 31.351 17.2187 31.2114 16.9722C30.9326 16.4803 30.506 15.8238 29.9136 15.1655C28.7281 13.8483 26.853 12.5 24.167 12.5V13.5ZM31.167 18C30.7028 17.8143 30.7028 17.8141 30.7029 17.814C30.7029 17.8139 30.703 17.8138 30.703 17.8137C30.703 17.8136 30.703 17.8136 30.703 17.8136C30.703 17.8137 30.7028 17.8141 30.7026 17.8148C30.702 17.8161 30.701 17.8186 30.6995 17.8222C30.6964 17.8295 30.6915 17.8413 30.6845 17.8573C30.6706 17.8894 30.6489 17.9383 30.619 18.0016C30.5593 18.1284 30.4673 18.3125 30.3414 18.5347C30.0889 18.9803 29.7029 19.5738 29.1703 20.1655C28.1059 21.3483 26.481 22.5 24.167 22.5V23.5C26.853 23.5 28.7281 22.1517 29.9136 20.8345C30.506 20.1762 30.9326 19.5197 31.2114 19.0278C31.351 18.7813 31.4544 18.5747 31.5236 18.4281C31.5581 18.3547 31.5842 18.2961 31.6021 18.255C31.611 18.2344 31.6179 18.2181 31.6227 18.2064C31.6252 18.2006 31.6271 18.196 31.6285 18.1925C31.6292 18.1907 31.6298 18.1893 31.6302 18.1882C31.6305 18.1876 31.6307 18.1871 31.6308 18.1867C31.6309 18.1865 31.631 18.1862 31.6311 18.1861C31.6311 18.1859 31.6312 18.1857 31.167 18ZM24.167 19.5C23.3386 19.5 22.667 18.8284 22.667 18H21.667C21.667 19.3807 22.7863 20.5 24.167 20.5V19.5ZM25.667 18C25.667 18.8284 24.9954 19.5 24.167 19.5V20.5C25.5477 20.5 26.667 19.3807 26.667 18H25.667ZM24.167 16.5C24.9954 16.5 25.667 17.1716 25.667 18H26.667C26.667 16.6193 25.5477 15.5 24.167 15.5V16.5ZM24.167 15.5C22.7863 15.5 21.667 16.6193 21.667 18H22.667C22.667 17.1716 23.3386 16.5 24.167 16.5V15.5Z"
                            fill="#6C6E71"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal open={showProfileModal}>
        <div className="flex flex-col items-end">
          <CloseOutlined
            className={`cursor-pointer`}
            onClick={() => setShowProfileModal(false)}
          />
        </div>

        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <img
              src={profileData?.image}
              alt="avatar"
              className="h-24 w-24 rounded-full"
            />
            <h1 className="text-title text-2xl font-work font-bold text-center mt-3">
              {profileData?.full_name}
            </h1>

            <div className="flex items-center justify-center flex-row gap-8 w-full mt-4 border-b border-b-gray90 pb-6">
              <div className="flex flex-col items-center">
                <h1 className={`text-gray100 text-sm font-work font-normal`}>
                  Joined
                </h1>
                <h1 className={`text-black text-lg font-work font-semibold`}>
                  {profileData?.joined ? profileData?.joined : "--"}
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <h1 className={`text-gray100 text-sm font-work font-normal`}>
                  Friends
                </h1>
                <h1 className={`text-black text-lg font-work font-semibold`}>
                  {profileData?.friends ? profileData?.friends : "--"}
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <h1 className={`text-gray100 text-sm font-work font-normal`}>
                  From
                </h1>
                {
                  <img
                    src={`https://flagsapi.com/${
                      profileData?.origin ? profileData?.origin : "US"
                    }/flat/64.png`}
                    alt="US"
                    className="w-8 h-7"
                  />
                }
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-4 border-b border-b-gray90 pb-6">
              <div className="col-span-1 flex-row flex items-center gap-2 border border-gray90 rounded-2xl p-4">
                <img src={level} alt="level" className="w-12 h-12" />
                <div>
                  <h1
                    className={`text-gray300 text-[20px] font-bold font-work`}
                  >
                    {profileData?.level}
                  </h1>
                  <p className={`text-gray100 text-sm font-work font-normal`}>
                    Level
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex-row flex items-center gap-2 border border-gray90 rounded-2xl p-4">
                <img src={badges} alt="badges" className="w-12 h-12" />
                <div>
                  <h1
                    className={`text-gray300 text-[20px] font-bold font-work`}
                  >
                    5
                  </h1>
                  <p className={`text-gray100 text-sm font-work font-normal`}>
                    Badges
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex-row flex items-center gap-2 border border-gray90 rounded-2xl p-4">
                <img src={coin} alt="coin" className="w-12 h-12" />
                <div>
                  <h1
                    className={`text-gray300 text-[20px] font-bold font-work`}
                  >
                    {profileData?.coins}
                  </h1>
                  <p className={`text-gray100 text-sm font-work font-normal`}>
                    Coins
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex-row flex items-center gap-2 border border-gray90 rounded-2xl p-4">
                <img src={trophy} alt="trophy" className="w-12 h-12" />
                <div>
                  <h1
                    className={`text-gray300 text-[20px] font-bold font-work`}
                  >
                    {profileData?.points ? profileData?.points : "--"}
                  </h1>
                  <p className={`text-gray100 text-sm font-work font-normal`}>
                    Points
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-black text-base font-work font-medium text-left">
              Travel Stats
            </h1>
            <p className="text-gray70 text-sm font-work font-normal mt-1">
              Attractions, cities, and countries they've visited!
            </p>

            <div className="mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FFEFF3] rounded-2xl p-4">
                  <h1 className="text-sm text-black font-work font-normal">
                    Attractions
                  </h1>
                  <h1 className="text-2xl text-black font-work font-semibold">
                    {profileData?.attractions}
                  </h1>
                </div>
                <div className="bg-[#FFF6ED] rounded-2xl p-4">
                  <h1 className="text-sm text-black font-work font-normal">
                    Cities
                  </h1>
                  <h1 className="text-2xl text-black font-work font-semibold">
                    {profileData?.cities}
                  </h1>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-[#F4F2FD] rounded-2xl p-4">
                  <h1 className="text-sm text-black font-work font-normal">
                    Countries
                  </h1>
                  <h1 className="text-2xl text-black font-work font-semibold">
                    {profileData?.countries}
                  </h1>
                </div>
              </div>

              <div className="mt-6 pb-6 border-b border-gray90">
                <h1 className="text-gray100 text-base font-work font-medium">
                  Avatar owned (1)
                </h1>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="col-span-1 border border-gray90 rounded-2xl p-4 flex flex-col items-center">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-[50%] h-auto rounded-full"
                    />
                    <h3 className="text-black text-sm font-work font-medium text-center my-2">
                      Adventurer
                    </h3>
                    <div>
                      <div className="border border-gray90 rounded-full py-2 px-4 cursor-pointer">
                        <h1 className="text-black font-bold text-sm font-work">
                          Owned
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pb-6 border-b border-gray90">
                <h1 className="text-gray100 text-base font-work font-medium">
                  Shop available avatar (4)
                </h1>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[...Array(4)].map((_, index) => (
                    <div
                      className="col-span-1 border border-gray90 rounded-2xl p-4 flex flex-col items-center"
                      key={index}
                    >
                      <div className="flex flex-row items-center justify-end w-full">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 8.5C3.5 7.67114 4.17114 7 5 7H11C11.8289 7 12.5 7.67114 12.5 8.5V12.5C12.5 13.3289 11.8289 14 11 14H5C4.17114 14 3.5 13.3289 3.5 12.5V8.5Z"
                            stroke="#6C6E71"
                          />
                          <path
                            d="M8 11V12"
                            stroke="#6C6E71"
                            stroke-linecap="round"
                          />
                          <path
                            d="M5 7V5V5C5 5 5 2 8 2C11 2 11 5 11 5V5C11 5 11 5.97 11 6.75"
                            stroke="#6C6E71"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <circle cx="8" cy="10" r="1" stroke="#6C6E71" />
                        </svg>
                      </div>
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-[50%] h-auto rounded-full"
                      />
                      <h3 className="text-black text-sm font-work font-medium text-center my-2">
                        Adventurer
                      </h3>
                      <div>
                        <div className="border border-premium rounded-full py-1 px-4 cursor-pointer flex flex-row items-center gap-2">
                          <img src={coin} alt="coin" className="w-8 h-8" />
                          <h1 className="text-black font-bold text-sm font-work">
                            200
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pb-6 border-b border-gray90">
                <h1 className="text-gray100 text-base font-work font-medium">
                  Digital items owned (1)
                </h1>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="col-span-1 border border-gray90 rounded-2xl p-4 flex flex-col items-center">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-[50%] h-auto rounded-full"
                    />
                    <h3 className="text-black text-sm font-work font-medium text-center my-2">
                      Adventurer
                    </h3>
                    <div>
                      <div className="border border-gray90 rounded-full py-2 px-4 cursor-pointer">
                        <h1 className="text-black font-bold text-sm font-work">
                          Owned
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pb-6 border-b border-gray90">
                <h1 className="text-gray100 text-base font-work font-medium">
                  Shop available digital items (8)
                </h1>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[...Array(8)].map((_, index) => (
                    <div
                      className="col-span-1 border border-gray90 rounded-2xl p-4 flex flex-col items-center"
                      key={index}
                    >
                      <div className="flex flex-row items-center justify-end w-full">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 8.5C3.5 7.67114 4.17114 7 5 7H11C11.8289 7 12.5 7.67114 12.5 8.5V12.5C12.5 13.3289 11.8289 14 11 14H5C4.17114 14 3.5 13.3289 3.5 12.5V8.5Z"
                            stroke="#6C6E71"
                          />
                          <path
                            d="M8 11V12"
                            stroke="#6C6E71"
                            stroke-linecap="round"
                          />
                          <path
                            d="M5 7V5V5C5 5 5 2 8 2C11 2 11 5 11 5V5C11 5 11 5.97 11 6.75"
                            stroke="#6C6E71"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <circle cx="8" cy="10" r="1" stroke="#6C6E71" />
                        </svg>
                      </div>
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-[50%] h-auto rounded-full"
                      />
                      <h3 className="text-black text-sm font-work font-medium text-center my-2">
                        Adventurer
                      </h3>
                      <div>
                        <div className="border border-premium rounded-full py-1 px-4 cursor-pointer flex flex-row items-center gap-2">
                          <img src={coin} alt="coin" className="w-8 h-8" />
                          <h1 className="text-black font-bold text-sm font-work">
                            200
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pb-6 border-b border-gray90">
                <h1 className="text-gray100 mb-4 text-base font-work font-medium">
                  Power ups (2)
                </h1>

                {[...Array(2)].map((_, index) => (
                  <div className="border mb-4 border-gray90 rounded-2xl p-4 flex flex-row items-center gap-2">
                    <div className="w-[25%]">
                      <img
                        src={mapBag}
                        alt="map bag"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="w-[75%]">
                      <div>
                        <h1 className="text-black text-base font-semibold font-work">
                          Time traveler’s clock
                        </h1>
                        <p className="text-gray100 text-sm font-work font-normal">
                          Add 1 day extra time to complete your current timed
                          challenge or event.
                        </p>

                        <div className="mt-6">
                          <p className="text-gray100 text-sm font-work font-normal text-center mb-2">
                            17 Jan, 2024 at 10:00 pm
                          </p>
                          <div className="border border-gray90 rounded-2xl p-4 cursor-pointer">
                            <p className="text-gray100 text-sm font-work font-bold text-center">
                              Equipped
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pb-2">
                <h1 className="text-gray100 text-base font-work font-medium my-4">
                  Bucketlist
                </h1>

                <div
                  className={`flex flex-row items-center bg-gray80 rounded-full`}
                >
                  <div
                    className={`${
                      bucketList === 0 ? "bg-primary" : "bg-transparent"
                    } px-4 py-3 rounded-full flex-1 flex flex-row items-center gap-2 justify-center cursor-pointer`}
                    onClick={() => {
                      setBucketList(0);
                    }}
                  >
                    <span
                      className={`${
                        bucketList === 0 ? "text-white" : "text-gray100"
                      } text-sm`}
                    >
                      Visited{" "}
                    </span>
                    <div
                      className={`${
                        bucketList === 0 ? "bg-white" : "bg-gray100"
                      } p-1 rounded-full flex flex-row items-center justify-center`}
                    >
                      <span
                        className={`${
                          bucketList === 0 ? "text-primary" : "text-white"
                        } text-xs`}
                      >
                        07
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${
                      bucketList === 1 ? "bg-primary" : "bg-transparent"
                    } px-4 py-3 rounded-full flex-1 flex flex-row items-center gap-2 justify-center cursor-pointer`}
                    onClick={() => {
                      setBucketList(1);
                    }}
                  >
                    <span
                      className={`${
                        bucketList === 1 ? "text-white" : "text-gray100"
                      } text-sm`}
                    >
                      List item{" "}
                    </span>
                    <div
                      className={`${
                        bucketList === 1 ? "bg-white" : "bg-gray100"
                      } p-1 rounded-full flex flex-row items-center justify-center`}
                    >
                      <span
                        className={`${
                          bucketList === 1 ? "text-primary" : "text-white"
                        } text-xs`}
                      >
                        14/20
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 gap-y-4 flex flex-col">
                  {[...Array(5)].map((_, index) => (
                    <div
                      className={`flex gap-2 flex-row items-center rounded-2xl p-2 border-b border-b-[#FC5D88BF] border-r border-r-[#FC5D88BF] h-24`}
                    >
                      <div className="w-[20%] rounded-2xl overflow-hidden h-full">
                        <img src={place} alt="place" className={`h-full`} />
                      </div>
                      <div className="w-[60%]">
                        <h1 className="text-black text-[20px] font-semibold font-work">
                          Eifel Tower
                        </h1>
                        <div>
                          <span
                            className={`text-gray100 text-sm font-work font-normal`}
                          >
                            Paris,{" "}
                          </span>
                          <span
                            className={`text-gray100 text-sm font-work font-normal`}
                          >
                            France
                          </span>
                        </div>

                        <div
                          className={`flex flex-row items-center gap-2 mt-2`}
                        >
                          <div className={`flex-row flex items-center gap-2`}>
                            <img src={coin} alt="coin" className={`h-6 w-6`} />
                            <span
                              className={`text-gray100 text-sm font-work font-normal`}
                            >
                              50 coins
                            </span>
                          </div>
                          <div className={`flex-row flex items-center gap-2`}>
                            <img
                              src={trophy}
                              alt="trophy"
                              className={`h-6 w-6`}
                            />
                            <span
                              className={`text-gray100 text-sm font-work font-normal`}
                            >
                              100 XP
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-[20%] h-full flex flex-col justify-between items-end">
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.2195 4.61183C20.7088 4.10083 20.1023 3.69547 19.4349 3.41891C18.7674 3.14235 18.052 3 17.3295 3C16.607 3 15.8916 3.14235 15.2242 3.41891C14.5567 3.69547 13.9503 4.10083 13.4395 4.61183L12.3795 5.67183L11.3195 4.61183C10.2878 3.58013 8.88855 3.00053 7.42951 3.00053C5.97048 3.00053 4.57121 3.58013 3.53951 4.61183C2.50782 5.64352 1.92822 7.04279 1.92822 8.50183C1.92822 9.96086 2.50782 11.3601 3.53951 12.3918L4.59951 13.4518L12.3795 21.2318L20.1595 13.4518L21.2195 12.3918C21.7305 11.8811 22.1359 11.2746 22.4124 10.6072C22.689 9.93972 22.8313 9.22431 22.8313 8.50183C22.8313 7.77934 22.689 7.06393 22.4124 6.39647C22.1359 5.72901 21.7305 5.12258 21.2195 4.61183Z"
                            fill="#D34635"
                            stroke="#D34635"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <div className="flex flex-row items-center bg-[#F4F2FD] px-2 py-1 rounded-2xl gap-2">
                          <svg
                            width="14"
                            height="16"
                            viewBox="0 0 14 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.670945 6.28204C0.720797 3.17699 2.97836 0.574025 6.0478 0.0790696C9.45552 -0.469299 12.7244 1.89509 13.3048 5.29569C13.5006 6.45652 13.3012 7.52833 12.8098 8.57522C12.1439 9.99599 11.2466 11.2672 10.2745 12.4921C9.34513 13.6636 8.35166 14.7746 7.29766 15.8393C7.08757 16.053 6.97362 16.053 6.76709 15.8429C5.14691 14.1906 3.63 12.453 2.35166 10.5194C1.72851 9.57937 1.1659 8.6037 0.856109 7.50697C0.745723 7.11171 0.699432 6.6951 0.621094 6.2856L0.667385 6.27848L0.670945 6.28204ZM10.5202 6.36038C10.5131 4.44109 8.94276 2.87432 7.02703 2.87788C5.1113 2.87788 3.53742 4.45889 3.54454 6.37106C3.5481 8.29035 5.12199 9.86068 7.03771 9.85356C8.96056 9.84643 10.5273 8.27611 10.5202 6.36038Z"
                              fill="white"
                            />
                            <path
                              d="M10.5201 6.3614C10.5272 8.27713 8.96047 9.84746 7.03762 9.85458C5.12189 9.8617 3.548 8.29137 3.54444 6.37208C3.54088 4.45992 5.11121 2.88247 7.02693 2.87891C8.94266 2.87891 10.513 4.44211 10.5201 6.3614ZM6.67441 6.99167C6.61744 6.93826 6.57827 6.90265 6.5391 6.86348C6.22575 6.55012 5.91239 6.23321 5.59548 5.92342C5.46017 5.79167 5.31061 5.78099 5.19667 5.89137C5.07916 6.00176 5.08984 6.16199 5.22159 6.30443C5.23584 6.32223 5.25364 6.33647 5.26788 6.35072C5.64889 6.73173 6.0299 7.11274 6.41091 7.49375C6.61388 7.69671 6.72426 7.69671 6.92723 7.49375C7.55038 6.8706 8.17708 6.24389 8.80023 5.62075C8.82872 5.59226 8.8572 5.56733 8.88213 5.53529C8.96759 5.41778 8.97115 5.29671 8.87145 5.18633C8.77886 5.08306 8.62575 5.07238 8.5118 5.16496C8.46551 5.20413 8.42278 5.24686 8.38005 5.28959C7.81388 5.85576 7.25127 6.41837 6.67441 6.99523V6.99167Z"
                              fill="#8C78EA"
                            />
                            <path
                              d="M6.67447 6.98974C7.25132 6.41289 7.81749 5.84672 8.3801 5.28411C8.42283 5.24138 8.46556 5.19508 8.51186 5.15948C8.6258 5.07046 8.78248 5.07758 8.8715 5.18084C8.96764 5.29123 8.96764 5.4123 8.88218 5.5298C8.86082 5.56185 8.82877 5.58678 8.80028 5.61526C8.17714 6.23841 7.55043 6.86512 6.92728 7.48826C6.72432 7.69123 6.61393 7.69123 6.41096 7.48826C6.02995 7.10725 5.64895 6.72624 5.26794 6.34523C5.25369 6.33099 5.23589 6.31319 5.22165 6.29894C5.08989 6.15651 5.07921 5.99983 5.19672 5.88589C5.31067 5.7755 5.46022 5.78618 5.59553 5.91793C5.91245 6.23129 6.2258 6.54464 6.53915 6.85799C6.57832 6.89716 6.61749 6.93277 6.67447 6.98618V6.98974Z"
                              fill="white"
                            />
                          </svg>
                          <span
                            className={`text-primary text-xs font-medium font-work`}
                          >
                            Visited
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={isEditModalVisible} onCancel={() => closeResetModal()}>
        <div className="flex flex-col items-end">
          <CloseOutlined
            className={`cursor-pointer`}
            onClick={() => closeResetModal()}
          />
        </div>
        <div>
          <h1 className="text-black text-2xl font-work font-extrabold">
            Options
          </h1>

          <div className="mt-6 gap-y-2">
            <h1
              className="text-black text-sm font-bold font-work py-2 cursor-pointer"
              onClick={() => {
                setIsResetPasswordModalVisible(true);
                setIsEditModalVisible(false);
              }}
            >
              Reset password
            </h1>
            <h1
              className="text-danger text-sm font-bold font-work py-2 cursor-pointer"
              onClick={() => {
                suspendUser();
              }}
            >
              Suspend user
            </h1>
            <h1
              className="text-danger text-sm font-bold font-work py-2 cursor-pointer"
              onClick={() => {
                setIsDeleteModalVisible(true);
                setIsEditModalVisible(false);
              }}
            >
              Delete user
            </h1>
          </div>
        </div>
      </Modal>

      <DeleteModal
        isVisible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
        handleOk={handleDeleteUser}
        handleCancel={() => setIsDeleteModalVisible(false)}
        title={"Are you sure you want to delete this user?"}
      />

      <Modal
        open={isResetPasswordModalVisible}
        onCancel={() => setIsResetPasswordModalVisible(false)}
      >
        <div>
          <div className="flex flex-row items-center justify-between gap-2">
            <h1 className="text-black text-2xl font-work font-extrabold">
              Reset password
            </h1>{" "}
            <CloseOutlined
              className={`cursor-pointer`}
              onClick={() => setIsResetPasswordModalVisible(false)}
            />
          </div>
          <div className="mt-6">
            <form action="" className={`mt-6`}>
              <div className={`mb-3 flex flex-col gap-y-4`}>
                {/* New Password */}
                <div className="flex flex-row px-4 bg-white items-center border border-90 rounded-2xl">
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 7V4C4.5 2.34315 5.84315 1 7.5 1C9.15685 1 10.5 2.34315 10.5 4V7M2.5 7H12.5C13.0523 7 13.5 7.44772 13.5 8V14C13.5 14.5523 13.0523 15 12.5 15H2.5C1.94772 15 1.5 14.5523 1.5 14V8C1.5 7.44772 1.94772 7 2.5 7Z"
                      stroke="#24272B"
                    />
                  </svg>

                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    name="new_password"
                    className="focus:outline-none p-4 w-full"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {showNewPassword ? (
                    <svg
                      onClick={() => setShowNewPassword(false)}
                      className="cursor-pointer"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 7.5L0.0357612 7.31431C-0.0119204 7.43351 -0.0119204 7.56649 0.0357612 7.68569L0.5 7.5ZM14.5 7.5L14.9642 7.6857C15.0119 7.56649 15.0119 7.43351 14.9642 7.3143L14.5 7.5ZM7.49998 12C5.18597 12 3.56111 10.8483 2.49664 9.66552C1.96405 9.07375 1.57811 8.48029 1.32563 8.03474C1.19968 7.81247 1.10772 7.62838 1.04797 7.50164C1.01811 7.4383 0.996349 7.3894 0.98246 7.35735C0.975517 7.34133 0.970545 7.32953 0.967517 7.32225C0.966003 7.31861 0.964975 7.3161 0.96443 7.31477C0.964157 7.3141 0.964005 7.31372 0.963973 7.31364C0.963958 7.31361 0.963972 7.31364 0.964016 7.31375C0.964038 7.31381 0.964094 7.31394 0.964105 7.31397C0.964168 7.31413 0.964239 7.31431 0.5 7.5C0.0357612 7.68569 0.0358471 7.68591 0.0359408 7.68614C0.0359823 7.68625 0.036084 7.6865 0.0361671 7.68671C0.0363335 7.68712 0.0365311 7.68761 0.0367599 7.68818C0.0372175 7.68931 0.0377999 7.69075 0.0385076 7.69248C0.0399231 7.69595 0.0418401 7.70062 0.0442628 7.70644C0.0491078 7.71808 0.0559773 7.73436 0.0649031 7.75495C0.0827516 7.79614 0.108844 7.85467 0.143439 7.92805C0.212592 8.07474 0.315944 8.28128 0.455611 8.52776C0.734381 9.01971 1.16093 9.67625 1.75334 10.3345C2.93886 11.6517 4.814 13 7.49998 13V12ZM0.5 7.5C0.964239 7.68569 0.964168 7.68587 0.964105 7.68603C0.964094 7.68606 0.964038 7.68619 0.964016 7.68625C0.963972 7.68636 0.963958 7.68639 0.963973 7.68636C0.964005 7.68628 0.964157 7.6859 0.96443 7.68523C0.964975 7.6839 0.966003 7.68139 0.967517 7.67775C0.970545 7.67047 0.975517 7.65867 0.98246 7.64265C0.996349 7.6106 1.01811 7.5617 1.04797 7.49836C1.10772 7.37162 1.19968 7.18753 1.32563 6.96526C1.57811 6.51971 1.96405 5.92625 2.49664 5.33448C3.56111 4.15173 5.18597 3 7.49998 3V2C4.814 2 2.93886 3.34827 1.75334 4.66552C1.16093 5.32375 0.734381 5.98029 0.455611 6.47224C0.315944 6.71872 0.212592 6.92526 0.143439 7.07195C0.108844 7.14533 0.0827516 7.20386 0.0649031 7.24505C0.0559773 7.26564 0.0491078 7.28192 0.0442628 7.29356C0.0418401 7.29938 0.0399231 7.30405 0.0385076 7.30752C0.0377999 7.30925 0.0372175 7.31069 0.0367599 7.31182C0.0365311 7.31239 0.0363335 7.31288 0.0361671 7.31329C0.036084 7.3135 0.0359823 7.31375 0.0359408 7.31386C0.0358471 7.31409 0.0357612 7.31431 0.5 7.5ZM7.49998 3C9.814 3 11.4389 4.15173 12.5033 5.33448C13.0359 5.92625 13.4219 6.51971 13.6744 6.96526C13.8003 7.18754 13.8923 7.37162 13.952 7.49837C13.9819 7.5617 14.0037 7.6106 14.0175 7.64265C14.0245 7.65868 14.0295 7.67048 14.0325 7.67775C14.034 7.68139 14.035 7.6839 14.0356 7.68524C14.0358 7.6859 14.036 7.68628 14.036 7.68636C14.036 7.6864 14.036 7.68636 14.036 7.68625C14.036 7.6862 14.0359 7.68606 14.0359 7.68603C14.0358 7.68587 14.0358 7.6857 14.5 7.5C14.9642 7.3143 14.9642 7.31409 14.9641 7.31385C14.964 7.31375 14.9639 7.3135 14.9638 7.31329C14.9637 7.31288 14.9635 7.31239 14.9632 7.31182C14.9628 7.31069 14.9622 7.30925 14.9615 7.30752C14.9601 7.30405 14.9582 7.29938 14.9557 7.29356C14.9509 7.28192 14.944 7.26564 14.9351 7.24504C14.9172 7.20385 14.8912 7.14533 14.8566 7.07195C14.7874 6.92526 14.6841 6.71871 14.5444 6.47224C14.2656 5.98029 13.8391 5.32375 13.2466 4.66552C12.0611 3.34827 10.186 2 7.49998 2V3ZM14.5 7.5C14.0358 7.3143 14.0358 7.31413 14.0359 7.31397C14.0359 7.31394 14.036 7.3138 14.036 7.31375C14.036 7.31364 14.036 7.3136 14.036 7.31364C14.036 7.31372 14.0358 7.3141 14.0356 7.31476C14.035 7.3161 14.034 7.31861 14.0325 7.32225C14.0295 7.32952 14.0245 7.34132 14.0175 7.35735C14.0037 7.3894 13.9819 7.4383 13.952 7.50163C13.8923 7.62838 13.8003 7.81246 13.6744 8.03474C13.4219 8.48029 13.0359 9.07375 12.5033 9.66552C11.4389 10.8483 9.814 12 7.49998 12V13C10.186 13 12.0611 11.6517 13.2466 10.3345C13.8391 9.67625 14.2656 9.01971 14.5444 8.52776C14.6841 8.28129 14.7874 8.07474 14.8566 7.92805C14.8912 7.85467 14.9172 7.79615 14.9351 7.75496C14.944 7.73436 14.9509 7.71808 14.9557 7.70644C14.9582 7.70062 14.9601 7.69595 14.9615 7.69248C14.9622 7.69075 14.9628 7.68931 14.9632 7.68818C14.9635 7.68761 14.9637 7.68712 14.9638 7.68671C14.9639 7.6865 14.964 7.68625 14.9641 7.68615C14.9642 7.68591 14.9642 7.6857 14.5 7.5ZM7.5 9C6.67157 9 6 8.32843 6 7.5H5C5 8.88071 6.11929 10 7.5 10V9ZM9 7.5C9 8.32843 8.32843 9 7.5 9V10C8.88071 10 10 8.88071 10 7.5H9ZM7.5 6C8.32843 6 9 6.67157 9 7.5H10C10 6.11929 8.88071 5 7.5 5V6ZM7.5 5C6.11929 5 5 6.11929 5 7.5H6C6 6.67157 6.67157 6 7.5 6V5Z"
                        fill="#1D1929"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowNewPassword(true)}
                      className="cursor-pointer"
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.49665 7.16634C3.56112 8.34909 5.18599 9.50082 7.5 9.50082C9.81401 9.50082 11.4389 8.34909 12.5034 7.16634C13.0359 6.57458 13.4219 5.98112 13.6744 5.53557C13.8003 5.31329 13.8923 5.12921 13.952 5.00246C13.9819 4.93912 14.0037 4.89023 14.0176 4.85817C14.0245 4.84215 14.0295 4.83035 14.0325 4.82307L14.0356 4.81559L14.0359 4.81479C14.0358 4.81495 14.0358 4.81513 14.5 5.00082C14.9642 5.18652 14.9642 5.18674 14.9641 5.18697L14.9638 5.18753L14.9633 5.189L14.9615 5.19331L14.9557 5.20727C14.9509 5.21891 14.944 5.23518 14.9351 5.25578C14.9173 5.29697 14.8912 5.3555 14.8566 5.42888C14.7874 5.57557 14.6841 5.78211 14.5444 6.02858C14.2656 6.52053 13.8391 7.17707 13.2467 7.83531C13.0638 8.0385 12.8645 8.24244 12.6483 8.44205L14.3536 10.1473L13.6465 10.8544L11.8716 9.07954C10.8638 9.80979 9.58254 10.3839 8 10.485L8.00001 12.5008L7.00001 12.5008L7 10.485C5.41747 10.3839 4.13622 9.8098 3.12839 9.07955L1.35356 10.8544L0.646458 10.1473L2.35167 8.44206C2.13553 8.24244 1.93624 8.03851 1.75336 7.83531C1.16095 7.17707 0.734393 6.52053 0.455623 6.02858C0.315956 5.78211 0.212603 5.57557 0.143451 5.42888C0.108856 5.35549 0.0827632 5.29697 0.0649147 5.25578C0.0559888 5.23518 0.0491194 5.21891 0.0442744 5.20726L0.0385192 5.19331L0.0367715 5.189L0.0361787 5.18753L0.0359524 5.18697C0.0358587 5.18673 0.0357727 5.18652 0.500012 5.00082C0.96425 4.81513 0.96418 4.81495 0.964117 4.8148L0.964028 4.81457L0.964441 4.81559L0.967528 4.82307C0.970557 4.83035 0.975528 4.84215 0.982471 4.85817C0.996361 4.89023 1.01812 4.93912 1.04798 5.00246C1.10773 5.12921 1.19969 5.31329 1.32565 5.53557C1.57812 5.98112 1.96407 6.57458 2.49665 7.16634ZM0.963985 4.81447C0.963969 4.81443 0.963983 4.81446 0.964028 4.81457L0.963985 4.81447Z"
                        fill="#24272B"
                      />
                    </svg>
                  )}
                </div>

                {/* confirm Password */}
                <div className="flex flex-row px-4 bg-white items-center border border-90 rounded-2xl">
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 7V4C4.5 2.34315 5.84315 1 7.5 1C9.15685 1 10.5 2.34315 10.5 4V7M2.5 7H12.5C13.0523 7 13.5 7.44772 13.5 8V14C13.5 14.5523 13.0523 15 12.5 15H2.5C1.94772 15 1.5 14.5523 1.5 14V8C1.5 7.44772 1.94772 7 2.5 7Z"
                      stroke="#24272B"
                    />
                  </svg>

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="c_password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`focus:outline-none p-4 w-full`}
                  />
                  {showConfirmPassword ? (
                    <svg
                      onClick={() => setShowConfrimPassword(false)}
                      className="cursor-pointer"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 7.5L0.0357612 7.31431C-0.0119204 7.43351 -0.0119204 7.56649 0.0357612 7.68569L0.5 7.5ZM14.5 7.5L14.9642 7.6857C15.0119 7.56649 15.0119 7.43351 14.9642 7.3143L14.5 7.5ZM7.49998 12C5.18597 12 3.56111 10.8483 2.49664 9.66552C1.96405 9.07375 1.57811 8.48029 1.32563 8.03474C1.19968 7.81247 1.10772 7.62838 1.04797 7.50164C1.01811 7.4383 0.996349 7.3894 0.98246 7.35735C0.975517 7.34133 0.970545 7.32953 0.967517 7.32225C0.966003 7.31861 0.964975 7.3161 0.96443 7.31477C0.964157 7.3141 0.964005 7.31372 0.963973 7.31364C0.963958 7.31361 0.963972 7.31364 0.964016 7.31375C0.964038 7.31381 0.964094 7.31394 0.964105 7.31397C0.964168 7.31413 0.964239 7.31431 0.5 7.5C0.0357612 7.68569 0.0358471 7.68591 0.0359408 7.68614C0.0359823 7.68625 0.036084 7.6865 0.0361671 7.68671C0.0363335 7.68712 0.0365311 7.68761 0.0367599 7.68818C0.0372175 7.68931 0.0377999 7.69075 0.0385076 7.69248C0.0399231 7.69595 0.0418401 7.70062 0.0442628 7.70644C0.0491078 7.71808 0.0559773 7.73436 0.0649031 7.75495C0.0827516 7.79614 0.108844 7.85467 0.143439 7.92805C0.212592 8.07474 0.315944 8.28128 0.455611 8.52776C0.734381 9.01971 1.16093 9.67625 1.75334 10.3345C2.93886 11.6517 4.814 13 7.49998 13V12ZM0.5 7.5C0.964239 7.68569 0.964168 7.68587 0.964105 7.68603C0.964094 7.68606 0.964038 7.68619 0.964016 7.68625C0.963972 7.68636 0.963958 7.68639 0.963973 7.68636C0.964005 7.68628 0.964157 7.6859 0.96443 7.68523C0.964975 7.6839 0.966003 7.68139 0.967517 7.67775C0.970545 7.67047 0.975517 7.65867 0.98246 7.64265C0.996349 7.6106 1.01811 7.5617 1.04797 7.49836C1.10772 7.37162 1.19968 7.18753 1.32563 6.96526C1.57811 6.51971 1.96405 5.92625 2.49664 5.33448C3.56111 4.15173 5.18597 3 7.49998 3V2C4.814 2 2.93886 3.34827 1.75334 4.66552C1.16093 5.32375 0.734381 5.98029 0.455611 6.47224C0.315944 6.71872 0.212592 6.92526 0.143439 7.07195C0.108844 7.14533 0.0827516 7.20386 0.0649031 7.24505C0.0559773 7.26564 0.0491078 7.28192 0.0442628 7.29356C0.0418401 7.29938 0.0399231 7.30405 0.0385076 7.30752C0.0377999 7.30925 0.0372175 7.31069 0.0367599 7.31182C0.0365311 7.31239 0.0363335 7.31288 0.0361671 7.31329C0.036084 7.3135 0.0359823 7.31375 0.0359408 7.31386C0.0358471 7.31409 0.0357612 7.31431 0.5 7.5ZM7.49998 3C9.814 3 11.4389 4.15173 12.5033 5.33448C13.0359 5.92625 13.4219 6.51971 13.6744 6.96526C13.8003 7.18754 13.8923 7.37162 13.952 7.49837C13.9819 7.5617 14.0037 7.6106 14.0175 7.64265C14.0245 7.65868 14.0295 7.67048 14.0325 7.67775C14.034 7.68139 14.035 7.6839 14.0356 7.68524C14.0358 7.6859 14.036 7.68628 14.036 7.68636C14.036 7.6864 14.036 7.68636 14.036 7.68625C14.036 7.6862 14.0359 7.68606 14.0359 7.68603C14.0358 7.68587 14.0358 7.6857 14.5 7.5C14.9642 7.3143 14.9642 7.31409 14.9641 7.31385C14.964 7.31375 14.9639 7.3135 14.9638 7.31329C14.9637 7.31288 14.9635 7.31239 14.9632 7.31182C14.9628 7.31069 14.9622 7.30925 14.9615 7.30752C14.9601 7.30405 14.9582 7.29938 14.9557 7.29356C14.9509 7.28192 14.944 7.26564 14.9351 7.24504C14.9172 7.20385 14.8912 7.14533 14.8566 7.07195C14.7874 6.92526 14.6841 6.71871 14.5444 6.47224C14.2656 5.98029 13.8391 5.32375 13.2466 4.66552C12.0611 3.34827 10.186 2 7.49998 2V3ZM14.5 7.5C14.0358 7.3143 14.0358 7.31413 14.0359 7.31397C14.0359 7.31394 14.036 7.3138 14.036 7.31375C14.036 7.31364 14.036 7.3136 14.036 7.31364C14.036 7.31372 14.0358 7.3141 14.0356 7.31476C14.035 7.3161 14.034 7.31861 14.0325 7.32225C14.0295 7.32952 14.0245 7.34132 14.0175 7.35735C14.0037 7.3894 13.9819 7.4383 13.952 7.50163C13.8923 7.62838 13.8003 7.81246 13.6744 8.03474C13.4219 8.48029 13.0359 9.07375 12.5033 9.66552C11.4389 10.8483 9.814 12 7.49998 12V13C10.186 13 12.0611 11.6517 13.2466 10.3345C13.8391 9.67625 14.2656 9.01971 14.5444 8.52776C14.6841 8.28129 14.7874 8.07474 14.8566 7.92805C14.8912 7.85467 14.9172 7.79615 14.9351 7.75496C14.944 7.73436 14.9509 7.71808 14.9557 7.70644C14.9582 7.70062 14.9601 7.69595 14.9615 7.69248C14.9622 7.69075 14.9628 7.68931 14.9632 7.68818C14.9635 7.68761 14.9637 7.68712 14.9638 7.68671C14.9639 7.6865 14.964 7.68625 14.9641 7.68615C14.9642 7.68591 14.9642 7.6857 14.5 7.5ZM7.5 9C6.67157 9 6 8.32843 6 7.5H5C5 8.88071 6.11929 10 7.5 10V9ZM9 7.5C9 8.32843 8.32843 9 7.5 9V10C8.88071 10 10 8.88071 10 7.5H9ZM7.5 6C8.32843 6 9 6.67157 9 7.5H10C10 6.11929 8.88071 5 7.5 5V6ZM7.5 5C6.11929 5 5 6.11929 5 7.5H6C6 6.67157 6.67157 6 7.5 6V5Z"
                        fill="#1D1929"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowConfrimPassword(true)}
                      className="cursor-pointer"
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.49665 7.16634C3.56112 8.34909 5.18599 9.50082 7.5 9.50082C9.81401 9.50082 11.4389 8.34909 12.5034 7.16634C13.0359 6.57458 13.4219 5.98112 13.6744 5.53557C13.8003 5.31329 13.8923 5.12921 13.952 5.00246C13.9819 4.93912 14.0037 4.89023 14.0176 4.85817C14.0245 4.84215 14.0295 4.83035 14.0325 4.82307L14.0356 4.81559L14.0359 4.81479C14.0358 4.81495 14.0358 4.81513 14.5 5.00082C14.9642 5.18652 14.9642 5.18674 14.9641 5.18697L14.9638 5.18753L14.9633 5.189L14.9615 5.19331L14.9557 5.20727C14.9509 5.21891 14.944 5.23518 14.9351 5.25578C14.9173 5.29697 14.8912 5.3555 14.8566 5.42888C14.7874 5.57557 14.6841 5.78211 14.5444 6.02858C14.2656 6.52053 13.8391 7.17707 13.2467 7.83531C13.0638 8.0385 12.8645 8.24244 12.6483 8.44205L14.3536 10.1473L13.6465 10.8544L11.8716 9.07954C10.8638 9.80979 9.58254 10.3839 8 10.485L8.00001 12.5008L7.00001 12.5008L7 10.485C5.41747 10.3839 4.13622 9.8098 3.12839 9.07955L1.35356 10.8544L0.646458 10.1473L2.35167 8.44206C2.13553 8.24244 1.93624 8.03851 1.75336 7.83531C1.16095 7.17707 0.734393 6.52053 0.455623 6.02858C0.315956 5.78211 0.212603 5.57557 0.143451 5.42888C0.108856 5.35549 0.0827632 5.29697 0.0649147 5.25578C0.0559888 5.23518 0.0491194 5.21891 0.0442744 5.20726L0.0385192 5.19331L0.0367715 5.189L0.0361787 5.18753L0.0359524 5.18697C0.0358587 5.18673 0.0357727 5.18652 0.500012 5.00082C0.96425 4.81513 0.96418 4.81495 0.964117 4.8148L0.964028 4.81457L0.964441 4.81559L0.967528 4.82307C0.970557 4.83035 0.975528 4.84215 0.982471 4.85817C0.996361 4.89023 1.01812 4.93912 1.04798 5.00246C1.10773 5.12921 1.19969 5.31329 1.32565 5.53557C1.57812 5.98112 1.96407 6.57458 2.49665 7.16634ZM0.963985 4.81447C0.963969 4.81443 0.963983 4.81446 0.964028 4.81457L0.963985 4.81447Z"
                        fill="#24272B"
                      />
                    </svg>
                  )}
                </div>
                <button
                  className="rounded-xl py-4 mt-4 cursor-pointer text-center font-work bg-primary text-white text-sm font-bold w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    setIsResetPasswordModalVisible(false);
                  }}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default User;
