import React, { useState } from "react";
import coin from "../assets/images/coin.png";
import trophy from "../assets/images/trophy.png";
import places from "../utils/places.json";
import { Modal, notification } from "antd";
import AttractionDetails from "./AttractionDetails";
import InfoAndPricing from "./InfoAndPricing";
import RewardsAndGamification from "./RewardsAndGamification";
import ImageUpload from "./ImageUpload";
import img from "../assets/images/place.png";
import { postAttraction } from "../api/listing";
import { useCookies } from "react-cookie";
import { attractionReformation } from "../lib/reformation";

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

  const [attraction, setAttraction] = useState({
    activity_levels: [], //
    address: "", //
    age: "", //
    best_visit_times: [], //
    category_id: null, //
    city: "", //
    coins: 0, //
    country: "", //
    description: "", //
    keywords: [], //
    latitude: 23.810331, //
    location: "", //
    longitude: 90.412521, //
    must_visit_spots: [], //
    name: "", //
    prices: [], //
    short_description_about_fun_fact: "", //
    short_description_about_secret_tips: "", //
    status: 0, //
    subcategories: [], //
    top_activities: [], //
    unique_features: [], //
    visit_hours: [], //
    // images: null, //
    xp: 0, //
  });

  // {
  //   name: "Bangladesh",
  //   attraction_id: "attraction#133d111",
  //   latitude: 12.345678,
  //   longitude: 98.765432,
  //   location: "Central City",
  //   description: "A wonderful attraction to visit.",
  //   must_visit_spots: ["spot1", "spot2"],
  //   category_id: 2,
  //   subcategories: ["testCat", "testCat2"],
  //   address: "123 Attraction Street",
  //   country: "CountryName",
  //   city: "CityName",
  //   age: "All Ages",
  //   prices: [200, 300],
  //   visit_hours: ["9:00 PM", "10:00 PM"],
  //   top_activities: ["Ride", "Tour"],
  //   short_description_about_fun_fact: "Fun fact about this attraction",
  //   short_description_about_secret_tips: "Secret tip to visit",
  //   unique_features: ["Dance", "Detail"],
  //   best_visit_times: ["summer", "winter"],
  //   activity_levels: ["special", "wonderful"],
  //   keywords: ["place", "visit"],
  //   xp: 500,
  //   coins: 1000,
  //   status: 1,
  // }
  console.log(attraction);

  const filterPlace = () => {
    if (activePlace === 0) {
      return places?.data?.attractions;
    }
    if (activePlace === 1) {
      return places?.data?.cities;
    }
    if (activePlace === 2) {
      return places?.data?.countries;
    }
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
    if (currentStep === addPlaceSteps.length - 1) {
      setIsAddPlaceModalOpen(false);
      try {
        const call = await postAttraction(cookies.token, attraction);
        console.log("from form");
        console.log(call);
      } catch (error) {
        console.error(error);
      }
      setCurrentStep(0);
      api["success"]({
        message: `A new ${
          activePlace === 0
            ? "Attraction"
            : activePlace === 1
            ? "City"
            : "Place"
        } has been added`,
        placement: "top",
        description: `${
          activePlace === 0
            ? "Attraction"
            : activePlace === 1
            ? "City"
            : "Place"
        } has been added successfully`,
      });
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
                24
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
                24
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
                96
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
                onClick={() => handleAddPlace(activePlace)}
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
            {filterPlace()?.map((place, index) => (
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
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80)",
                  }}
                >
                  <svg
                    className="mt-2 mr-2 cursor-pointer"
                    onClick={() => setOptionModal(true)}
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
                        50 coins
                      </p>
                    </div>
                    <div className={`flex flex-row items-center gap-1.5`}>
                      <img src={trophy} alt="trophy" className={`h-6 w-6`} />
                      <p
                        className={`text-gray100 text-xs font-normal font-work`}
                      >
                        50 coins
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
            onClick={handleOk}
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
            onClick={() => {
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
                Colosseum
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Location Name
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Rome
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Description
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
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
                #23564
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Must Visit Spots
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {[...Array(5)].map((_, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    Spain
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Category
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Adventure
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Address
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Rome, Italy
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Address
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Rome, Italy
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Country
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Bangladesh
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                City
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Dhaka
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Age
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                8-12
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Pricing
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {[...Array(5)].map((_, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    $110
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Visiting Hours
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {[...Array(5)].map((_, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    9am - 5pm
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Top Activities
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {[...Array(5)].map((_, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    Swimming
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Fun Fact
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Secret Tips
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Unique Features
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {[...Array(5)].map((_, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    Swimming
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Best time to visit
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Summer
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Activity Level
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                Relaxation
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Keywords
              </h2>
              <div className="mt-1 gap-2 flex flex-row">
                {[...Array(5)].map((_, index) => (
                  <span
                    className="bg-secondary px-3 py-1.5 rounded-full text-title font-normal"
                    key={index}
                  >
                    Swimming
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Number of XP
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                350
              </h2>
            </div>
            <div>
              <h2 className="text-title text-base font-work font-semibold">
                Number of Coins
              </h2>
              <h2 className="text-title text-base font-work font-normal">
                400
              </h2>
            </div>
            <div className="flex flex-row items-center gap-3">
              {[...Array(3)].map((_, index) => (
                <img
                  src={img}
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
