import React, { useEffect, useRef, useState } from "react";
import coin from "../assets/images/coin.png";
import trophy from "../assets/images/trophy.png";
import places from "../utils/places.json";
import { Modal, notification } from "antd";
import AttractionDetails from "./AttractionDetails";
import InfoAndPricing from "./InfoAndPricing";
import RewardsAndGamification from "./RewardsAndGamification";
import ImageUpload from "./ImageUpload";
import img from "../assets/images/place.png";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL, BASE_ONLYURL } from "../api/base";

const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

function Listing() {
  const [activePlace, setActivePlace] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [addPlaceType, setAddPlaceType] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [optionModal, setOptionModal] = useState(false);
  const [isViewDetailsModalVisible, setIsViewDetailsModalVisible] =
    useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [cookies] = useCookies(["token"]);
  const [filterPlace, setfilterPlace] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debounceRef = useRef();
  const [res, setRes] = useState(null);
  const [specific, setSpecific] = useState(null);
  const [specificID, setSpecificID] = useState(0);
  const [specificData, setSpecificData] = useState(null);
  const [amms, setAmms] = useState({
    att: 0,
    city: 0,
    country: 0,
  });
  const [viewItem, setViewItem] = useState(null);
  const [attraction, setAttraction] = useState({
    name: "", //
    latitude: 23.810331, //
    longitude: 90.412521, //
    location: "", //
    description: "", //
    must_visit_spots: [], //
    category_id: null, //
    subcategories: [], //
    address: "", //
    country: "", //
    city: "", //
    age: "", //
    prices: [], //
    visit_hours: [], //
    top_activities: [], //
    short_description_about_fun_fact: "", //
    short_description_about_secret_tips: "", //
    unique_features: [], //
    best_visit_times: [], //
    activity_levels: [], //
    keywords: [], //
    xp: 0, //
    coins: 0, //
    status: 1, //
    images: [],
  });
  console.log(attraction);

  useEffect(() => {
    const filterPlacer = async () => {
      try {
        const callattraction = await axios.get(`${BASE_URL}/get-attraction`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const callcities = await axios.get(`${BASE_URL}/get-city`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const callcountry = await axios.get(`${BASE_URL}/get-country`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        setAmms({
          att: callattraction.data.data.total,
          city: callcities.data.data.total,
          country: callcountry.data.data.total,
        });
      } catch (error) {
        console.error(error);
      }

      if (activePlace === 0) {
        const callattraction = await axios.get(`${BASE_URL}/get-attraction`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setRes(callattraction.data.data);
        setfilterPlace(callattraction.data.data.data);

        // setfilterPlace(places?.data?.attractions);
      }
      if (activePlace === 1) {
        const callcities = await axios.get(`${BASE_URL}/get-city`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setRes(callcities.data.data);
        setfilterPlace(callcities.data.data.data);
      }
      if (activePlace === 2) {
        const callcountry = await axios.get(`${BASE_URL}/get-country`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setRes(callcountry.data.data);
        setfilterPlace(callcountry.data.data.data);

        // setfilterPlace(places?.data?.attractions);
      }
    };
    filterPlacer();
  }, [activePlace]);

  const fetchData = async (search = "", page = 1) => {
    try {
      let endpoint = "";
      if (activePlace === 0) endpoint = "get-attraction";
      else if (activePlace === 1) endpoint = "get-city";
      else if (activePlace === 2) endpoint = "get-country";

      const res = await axios.get(
        `${BASE_URL}/${endpoint}?search=${search}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      setRes(res.data.data);
      setfilterPlace(res.data.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchSpecificData = async (search = "") => {
    try {
      let endpoint = "";
      if (activePlace === 0) endpoint = "get-attraction";
      else if (activePlace === 1) endpoint = "get-city";
      else if (activePlace === 2) endpoint = "get-country";

      const res = await axios.get(`${BASE_URL}/${endpoint}?search=${search}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      // console.log(res.data.data);

      setSpecificData(res.data.data.data[0]);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    debounceRef.current = debounce(fetchData, 300);
  }, [activePlace]);

  const handleChangeSearch = (e) => {
    const val = e.target.value;
    setSearchText(val);
    debounceRef.current(val);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddPlace = (e) => {
    setIsAddPlaceModalOpen(true);
    setAddPlaceType(e);
  };
  const handlePlaceAdded = () => {
    setIsAddPlaceModalOpen(false);
  };
  const handleAddPlaceCancel = () => {
    setIsAddPlaceModalOpen(false);
  };

  const handleContinueAddPlace = async () => {
    const formData = new FormData();

    Object.entries(attraction).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (Array.isArray(value)) {
        if (key === "images") {
          // images assumed to be File objects
          value.forEach((file) => {
            formData.append("images[]", file);
          });
        } else {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
        }
      } else {
        formData.append(key, value);
      }
    });
    if (activePlace === 0) {
      if (currentStep === addPlaceSteps.length - 1) {
        try {
          const call = await axios.post(
            `http://161.35.162.41:8000/api/attraction`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );
          // console.log(call);
          api["success"]({
            message: call.data.message,
            placement: "top",
          });
        } catch (error) {
          console.error(error);
        }

        setIsAddPlaceModalOpen(false);
      }
    } else if (activePlace === 1) {
      if (currentStep === addPlaceSteps.length - 1) {
        try {
          const call = await axios.post(
            `http://161.35.162.41:8000/api/city`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );
          // console.log(call);
          api["success"]({
            message: call.data.message,
            placement: "top",
          });
        } catch (error) {
          console.error(error);
        }

        setIsAddPlaceModalOpen(false);
      }
    } else {
      try {
        const call = await axios.post(
          `http://161.35.162.41:8000/api/country`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        api["success"]({
          message: call.data.message,
          placement: "top",
        });
      } catch (error) {
        console.error(error);
      }

      setIsAddPlaceModalOpen(false);
    }

    if (currentStep < addPlaceSteps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
    console.log(`Current Step: ${addPlaceSteps[currentStep].title}`);
  };

  const handlePreviousAddPlace = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const addPlaceSteps = [
    {
      id: 0,
      title: "Attraction Details",
    },
    {
      id: 1,
      title: "Key Info & Pricing",
    },
    {
      id: 2,
      title: "Rewards & Gamification",
    },
    {
      id: 3,
      title: "Image Upload",
    },
  ];

  // const openNotification = () => {
  //   notification.open({
  //     message: 'Notification Title',
  //     description: 'This is the content of the notification.',
  //     onClick: () => {
  //       console.log('Notification Clicked!');
  //     },
  //   });
  // };

  if (!res) {
    return <>Just a second..</>;
  }

  return (
    <div>
      {contextHolder}
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div className={`w-full`}>
            <h1 className="text-black text-2xl font-semibold font-work">
              Listings
            </h1>
            <p className="text-gray100 text-sm font-work mt-1 font-normal">
              Add, edit or delete attractions, cities and countries
            </p>

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
                placeholder="Search from listing..."
                className="w-full py-4 text-black text-sm font-work"
                style={{ outline: "none" }}
                value={searchText}
                onChange={handleChangeSearch}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-4 mt-2">
            <div
              className={`flex-row flex items-center gap-1.5 cursor-pointer border-b-[2px] ${
                activePlace === 0 ? "border-b-primary" : "border-b-transparent"
              }`}
              onClick={() => setActivePlace(0)}
            >
              <h1
                className={`${
                  activePlace === 0 ? "text-primary" : "text-gray100"
                } text-sm font-work font-semibold`}
              >
                Attractions
              </h1>
              <span
                className={`${
                  activePlace === 0 ? "bg-primary" : "bg-gray100"
                } px-0.5 rounded text-white text-xs font-work`}
              >
                {amms.att}
              </span>
            </div>

            <div
              className={`flex-row flex items-center gap-1.5 cursor-pointer border-b-[2px] ${
                activePlace === 1 ? "border-b-primary" : "border-b-transparent"
              }`}
              onClick={() => setActivePlace(1)}
            >
              <h1
                className={`${
                  activePlace === 1 ? "text-primary" : "text-gray100"
                } text-sm font-work font-semibold`}
              >
                Cities
              </h1>
              <span
                className={`${
                  activePlace === 1 ? "bg-primary" : "bg-gray100"
                }  px-0.5 rounded text-white text-xs font-work`}
              >
                {amms.city}
              </span>
            </div>

            <div
              className={`flex-row flex items-center gap-1.5 cursor-pointer border-b-[2px] ${
                activePlace === 2 ? "border-b-primary" : "border-b-transparent"
              }`}
              onClick={() => setActivePlace(2)}
            >
              <h1
                className={`${
                  activePlace === 2 ? "text-primary" : "text-gray100"
                } text-sm font-work font-semibold`}
              >
                Countries
              </h1>
              <span
                className={`${
                  activePlace === 2 ? "bg-primary" : "bg-gray100"
                }  px-0.5 rounded text-white text-xs font-work`}
              >
                {amms.country}
              </span>
            </div>
          </div>
          <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <div
              className={`border-r ${
                activePlace === 0
                  ? "border-r-[#FC5D88BF] border-b-[#FC5D88BF]"
                  : activePlace === 1
                  ? "border-r-[#FFA94DBF] border-b-[#FFA94DBF]"
                  : activePlace === 2
                  ? "border-r-[#8C78EABF] border-b-[#8C78EABF]"
                  : "border-r-transparent border-b-transparent"
              } border-b rounded-xl p-1.5 flex flex-col items-center justify-center`}
            >
              <svg
                className={`cursor-pointer`}
                onClick={() => {
                  localStorage.setItem(
                    "topic",
                    activePlace === 0
                      ? "Attraction"
                      : activePlace === 1
                      ? "City"
                      : "Country"
                  );
                  handleAddPlace(activePlace);
                }}
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_358_1535)">
                  <rect
                    x="0.879028"
                    y="0.5"
                    width="47"
                    height="47"
                    rx="17.5"
                    stroke="#E8E8EA"
                    stroke-dasharray="4 4"
                  />
                  <path d="M24.879 18V31M18.379 24.5H31.379" stroke="#1D1929" />
                </g>
                <defs>
                  <clipPath id="clip0_358_1535">
                    <rect
                      x="0.379028"
                      width="48"
                      height="48"
                      rx="18"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>

              <h1 className={`text-black text-base font-work font-medium`}>
                Add{" "}
                {activePlace === 0
                  ? "Attraction"
                  : activePlace === 1
                  ? "City"
                  : "Country"}
              </h1>
            </div>
            {filterPlace?.map((place, index) => (
              <div
                className={`cursor-pointer border-r ${
                  activePlace === 0
                    ? "border-r-[#FC5D88BF] border-b-[#FC5D88BF]"
                    : activePlace === 1
                    ? "border-r-[#FFA94DBF] border-b-[#FFA94DBF]"
                    : activePlace === 2
                    ? "border-r-[#8C78EABF] border-b-[#8C78EABF]"
                    : "border-r-transparent border-b-transparent"
                } border-b rounded-xl p-1.5`}
                key={index}
              >
                <div
                  className="h-32 bg-cover bg-no-repeat rounded-xl overflow-hidden flex flex-col items-end"
                  style={{
                    backgroundImage: `url(${
                      place?.images[0]
                        ? BASE_ONLYURL + place.images[0]
                        : "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                    })`,
                  }}
                >
                  <svg
                    className="mt-2 mr-2 cursor-pointer"
                    onClick={() => {
                      setSpecific(place?.name);
                      setSpecificID(place?.id);
                      setOptionModal(true);
                    }}
                    width="41"
                    height="40"
                    viewBox="0 0 41 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.757812"
                      width="40"
                      height="40"
                      rx="12"
                      fill="white"
                      fill-opacity="0.6"
                    />
                    <path
                      d="M20.2578 16C19.9817 16 19.7578 15.7761 19.7578 15.5C19.7578 15.2239 19.9817 15 20.2578 15C20.534 15 20.7578 15.2239 20.7578 15.5C20.7578 15.7761 20.534 16 20.2578 16Z"
                      stroke="#24272B"
                    />
                    <path
                      d="M20.2578 21C19.9817 21 19.7578 20.7761 19.7578 20.5C19.7578 20.2239 19.9817 20 20.2578 20C20.534 20 20.7578 20.2239 20.7578 20.5C20.7578 20.7761 20.534 21 20.2578 21Z"
                      stroke="#24272B"
                    />
                    <path
                      d="M20.2578 26C19.9817 26 19.7578 25.7761 19.7578 25.5C19.7578 25.2239 19.9817 25 20.2578 25C20.534 25 20.7578 25.2239 20.7578 25.5C20.7578 25.7761 20.534 26 20.2578 26Z"
                      stroke="#24272B"
                    />
                  </svg>
                </div>
                <div className={`mt-2`}>
                  <h1
                    className={`text-title text-[20px] font-work font-semibold`}
                  >
                    {place?.name}
                  </h1>
                  <p className={`text-gray100 text-sm font-work font-normal`}>
                    {place?.location}
                  </p>
                  <div className={`flex-row flex items-center gap-2`}>
                    <div className={`flex flex-row items-center gap-1.5`}>
                      <img src={coin} alt="coin" className={`h-6 w-6`} />
                      <p
                        className={`text-gray100 text-xs font-normal font-work`}
                      >
                        {place?.coins} coins
                      </p>
                    </div>
                    <div className={`flex flex-row items-center gap-1.5`}>
                      <img src={trophy} alt="trophy" className={`h-6 w-6`} />
                      <p
                        className={`text-gray100 text-xs font-normal font-work`}
                      >
                        {place?.xp} xp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`mt-8 flex-row flex items-center justify-between`}>
          <div>
            <h1 className={`text-black text-sm font-nunito font-bold`}>
              page {res.current_page} of {res.last_page}
            </h1>
          </div>
          <div className="flex flex-row items-center gap-3">
            <button
              className="border border-gray100 rounded-xl px-4 py-2 cursor-pointer"
              disabled={res.current_page <= 1}
              onClick={() => {
                if (res.current_page > 1) {
                  fetchData(undefined, res.current_page - 1);
                }
              }}
            >
              Previous
            </button>
            <button
              className="border border-gray100 rounded-xl px-4 py-2 cursor-pointer"
              onClick={() => {
                fetchData(undefined, res.current_page + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        width={350}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1
          className={`text-black text-2xl font-semibold font-work text-center`}
        >
          Delete{" "}
          {activePlace === 0
            ? "Attraction"
            : activePlace === 1
            ? "City"
            : "Country"}
        </h1>
        <p
          className={`text-gray100 text-sm font-work font-normal text-center leading-7 mt-2`}
        >
          If you delete the{" "}
          {activePlace === 0
            ? "Attraction"
            : activePlace === 1
            ? "City"
            : "Country"}
          , it will be permanently removed from your{" "}
          {activePlace === 0
            ? "Attractions"
            : activePlace === 1
            ? "Cities"
            : "Countries"}
          .
        </p>
        <div className="flex flex-row items-center gap-3 justify-between mt-4">
          <button
            className={` rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-danger`}
            onClick={async () => {
              try {
                const call = await axios.delete(
                  `${BASE_URL}/delete-attraction?attraction_id=${specificID}`,
                  {
                    headers: {
                      Authorization: `Bearer ${cookies.token}`,
                    },
                  }
                );
                api["success"]({
                  message: call.data.message,
                  placement: "top",
                });
                fetchData();
              } catch (error) {
                console.error(error);
              }
              handleOk();
            }}
          >
            Delete
          </button>
          <button
            className={` rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary`}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Add place modal */}
      <Modal
        open={isAddPlaceModalOpen}
        onOk={handlePlaceAdded}
        onCancel={handleAddPlaceCancel}
        width={"85%"}
      >
        <div>
          <div className="my-6 flex flex-row items-center justify-between">
            <h1 className="text-black text-2xl font-work font-semibold">
              {addPlaceType === 0
                ? "Attractions"
                : addPlaceType === 1
                ? "Cities"
                : "Countries"}
            </h1>
            <div className="flex flex-row items-center gap-3 justify-between mt-4">
              <button
                className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-primary border border-gray90"
                onClick={handlePreviousAddPlace}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
                onClick={handleContinueAddPlace}
              >
                {currentStep === addPlaceSteps.length - 1
                  ? "Publish"
                  : "Continue"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-4">
              {addPlaceSteps.map((step, index) => (
                <div key={index}>
                  <div className="flex flex-row items-center gap-3">
                    {index < currentStep ? (
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="32" height="32" rx="12" fill="#7F6DD5" />
                        <path
                          d="M9.06665 15.4659L13.8667 20.2659L22.9333 11.1992"
                          stroke="white"
                          strokeLinecap="square"
                        />
                      </svg>
                    ) : index === currentStep ? (
                      // Current step - Show red number
                      <div className="w-[32px] h-[32px] rounded-lg bg-[#F4F2FD] flex items-center justify-center border">
                        <h1 className="text-primary text-sm font-work font-semibold">
                          {index + 1}
                        </h1>
                      </div>
                    ) : (
                      // Future steps - Show gray number
                      <div className="w-[32px] h-[32px] rounded-lg bg-gray90 flex items-center justify-center">
                        <h1 className="text-black text-sm font-work font-semibold">
                          {index + 1}
                        </h1>
                      </div>
                    )}

                    <h1 className="text-black text-sm font-work font-semibold">
                      {step.title}
                    </h1>
                  </div>
                  {index !== addPlaceSteps.length - 1 && (
                    <div
                      className={`h-6 ${
                        index < currentStep ? "bg-primary" : "bg-gray70"
                      } w-[3px] rounded-full ml-3.5 my-1`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="col-span-8">
              <div>
                {addPlaceSteps[currentStep].id === 0 ? (
                  <AttractionDetails
                    form={attraction}
                    setForm={setAttraction}
                  />
                ) : addPlaceSteps[currentStep].id === 1 ? (
                  <InfoAndPricing form={attraction} setForm={setAttraction} />
                ) : addPlaceSteps[currentStep].id === 2 ? (
                  <RewardsAndGamification
                    form={attraction}
                    setForm={setAttraction}
                  />
                ) : addPlaceSteps[currentStep].id === 3 ? (
                  <ImageUpload form={attraction} setForm={setAttraction} />
                ) : (
                  <h2>No Optiion Available</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={optionModal}
        width={350}
        onOk={() => {
          setOptionModal(false);
        }}
        onCancel={() => {
          setOptionModal(false);
        }}
      >
        <div className={`border-b border-dotted border-b-gray90 pb-4`}>
          <h1 className="text-title text-2xl font-work font-extrabold">
            Options
          </h1>
        </div>

        <div className="mt-4">
          <h1
            className={`text-title text-sm font-work font-bold cursor-pointer mb-2 hover:opacity-70`}
            onClick={async () => {
              fetchSpecificData(specific);

              setIsViewDetailsModalVisible(true);
              setOptionModal(false);
            }}
          >
            View{" "}
            {activePlace === 0
              ? "Attraction"
              : activePlace === 1
              ? "City"
              : "Country"}
          </h1>

          <h1
            className={`text-title text-sm font-work font-bold cursor-pointer mb-2 hover:opacity-70`}
            onClick={() => {
              handleAddPlace(activePlace);
              setOptionModal(false);
            }}
          >
            Edit{" "}
            {activePlace === 0
              ? "Attraction"
              : activePlace === 1
              ? "City"
              : "Country"}
          </h1>
          <h1
            className={`text-danger text-sm font-work font-bold cursor-pointer hover:opacity-70`}
            onClick={() => {
              showModal();
              setOptionModal(false);
            }}
          >
            Delete{" "}
            {activePlace === 0
              ? "Attraction"
              : activePlace === 1
              ? "City"
              : "Country"}
          </h1>
        </div>
      </Modal>
      {/* HELLBORN  */}
      <Modal
        open={isViewDetailsModalVisible}
        onOk={() => setIsViewDetailsModalVisible(false)}
        onCancel={() => setIsViewDetailsModalVisible(false)}
        width={"70%"}
      >
        <div>
          <h1 className="text-title text-3xl font-work font-semibold">
            {activePlace === 0
              ? "Attraction"
              : activePlace === 1
              ? "City"
              : "Country"}{" "}
            Details
          </h1>

          <div className="mt-4 flex-col flex gap-y-4">
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                {activePlace === 0
                  ? "Attraction"
                  : activePlace === 1
                  ? "City"
                  : "Country"}{" "}
                Name
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.name}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Location Name
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.location}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Description
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.description}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                {activePlace === 0
                  ? "Attraction"
                  : activePlace === 1
                  ? "City"
                  : "Country"}{" "}
                ID
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                #{specificData?.attraction_id}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Must Visit Spots
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {specificData?.must_visit_spots.map((x, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Category
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.category.name}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Address
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.address}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Country
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.country}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                City
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.city}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Age
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.age}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Pricing
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {specificData?.prices.map((x, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Visiting Hours
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {specificData?.visit_hours.map((x, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Top Activities
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {specificData?.top_activities.map((x, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Fun Fact
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.short_description_about_fun_fact}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Secret Tips
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.short_description_about_secret_tips}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Unique Features
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {specificData?.unique_features.map((x, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Best time to visit
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.best_visit_times}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Activity Level
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.activity_levels}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Keywords
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {specificData?.keywords.map((x, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Number of XP
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.xp}
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Number of Coins
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                {specificData?.coins}
              </h2>
            </div>
            <div className="flex flex-row items-center gap-3">
              {specificData?.images.map((x, index) => (
                <img
                  src={BASE_ONLYURL + x}
                  alt=""
                  className="rounded-2xl w-[32%]"
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Listing;
