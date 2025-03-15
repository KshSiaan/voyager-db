import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
// import users from "../utils/users.json";
import { Checkbox, Modal } from "antd";
import coin from "../assets/images/coin.png";
import badges from "../assets/images/badges.png";
import level from "../assets/images/level.png";
import trophy from "../assets/images/trophy.png";
import { fetchTransaction } from "../api/others";
import { useCookies } from "react-cookie";

function Transactions() {
  const [profileData, setProfileData] = useState({});
  const [searchData, setSearchData] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [users, setUsers] = useState([]);
  const handleUserProfile = (user) => {
    setProfileData(user);
    setShowProfileModal(true);
  };
  const [cookies] = useCookies(["token"]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };
  useEffect(() => {
    async function UsersSetter() {
      try {
        const call = await fetchTransaction(cookies.token);
        setUsers(call.data.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    UsersSetter();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchData.toLowerCase()) ||
      user.email.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div>
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div className={`w-full`}>
            <h1 className="text-black text-2xl font-semibold font-work mb-8">
              Transactions of Subscribers
            </h1>

            <div
              className={`border border-90 px-4 mb-6 py-4 rounded-xl flex flex-row items-center gap-2`}
            >
              <SearchOutlined color="#24272B" />
              <input
                type="text"
                name=""
                id=""
                className="focus:outline-none w-full"
                placeholder="Search transaction by their name or email..."
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>

            <table className="table-auto w-full">
              <thead className="bg-gray90 rounded-xl">
                <tr className="h-12">
                  <th className="text-left pl-4 text-gray300 text-xs font-work font-medium">
                    Invoice
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Date
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Status
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Customer
                  </th>
                  <th className="text-left text-gray300 text-xs font-work font-medium">
                    Purchase
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((item) => (
                  <tr
                    className={`border-b border-b-[#E9E9EA] py-2 gap-y-2 cursor-pointer ${
                      selectedRows.includes(item?.id) ? "bg-secondary" : ""
                    }`}
                    key={item?.id}
                  >
                    <td className="pl-4">
                      <Checkbox
                        onChange={() => handleCheckboxChange(item?.id)}
                      />{" "}
                      #24272B
                    </td>
                    <td>Jan 6, 2024</td>
                    <td>
                      <div className="flex flex-row items-center">
                        {item?.isPaid ? (
                          <div className="bg-[#F5F9F6] rounded-full px-3 py-1 flex-row flex items-center justify-center gap-1">
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.80005 1L3.30005 6.5L0.800049 4"
                                stroke="#89B09A"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span>Paid</span>
                          </div>
                        ) : (
                          <div className="bg-[#FFEFF3] rounded-full px-3 py-1 flex-row flex items-center justify-center gap-1">
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.80005 1L0.800049 7M0.800049 1L6.80005 7"
                                stroke="#E5557C"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>

                            <span>Cancelled</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td
                      className="pl-4 flex flex-row items-center gap-2 cursor-pointer"
                      onClick={() => handleUserProfile(item)}
                    >
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
                          {item?.name}
                        </h1>
                        <h1
                          className={`text-[#475467] text-sm font-work font-normal`}
                        >
                          {item?.email}
                        </h1>
                      </div>
                    </td>
                    <td>
                      {item?.subscriber
                        ? "Monthly subscription"
                        : "Yearly subscription"}
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
              {profileData?.name}
            </h1>

            <div className="flex items-center justify-center flex-row gap-8 w-full mt-4 border-b border-b-gray90 pb-6">
              <div className="flex flex-col items-center">
                <h1 className={`text-gray100 text-sm font-work font-normal`}>
                  Joined
                </h1>
                <h1 className={`text-black text-lg font-work font-semibold`}>
                  {profileData?.joined}
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <h1 className={`text-gray100 text-sm font-work font-normal`}>
                  Friends
                </h1>
                <h1 className={`text-black text-lg font-work font-semibold`}>
                  {profileData?.friends}
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <h1 className={`text-gray100 text-sm font-work font-normal`}>
                  From
                </h1>
                <img
                  src={`https://flagsapi.com/${profileData?.origin}/flat/64.png`}
                  alt="US"
                  className="w-8 h-7"
                />
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
                    {profileData?.badges}
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
                    {profileData?.points}
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
                    {profileData?.attractionVisited}
                  </h1>
                </div>
                <div className="bg-[#FFF6ED] rounded-2xl p-4">
                  <h1 className="text-sm text-black font-work font-normal">
                    Cities
                  </h1>
                  <h1 className="text-2xl text-black font-work font-semibold">
                    {profileData?.cityVisited}
                  </h1>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-[#F4F2FD] rounded-2xl p-4">
                  <h1 className="text-sm text-black font-work font-normal">
                    Countries
                  </h1>
                  <h1 className="text-2xl text-black font-work font-semibold">
                    {profileData?.countryVisited}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Transactions;
