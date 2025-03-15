import { DatePicker, Select } from "antd";
import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import { fetchDashboard } from "../api/dashboard";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
//
const { RangePicker } = DatePicker;
function Dashboard() {
  const [staticsFilter, setStaticsFilter] = useState("revenue");
  const [filteredStatics, setFilteredStatics] = useState("weekly");
  const [fetchedData, setFetchedData] = useState(null);
  const [cookie, , removeCookie] = useCookies(["token"]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setFilteredStatics(value);
  };

  const handleRevenueChange = (value) => {
    setStaticsFilter(value);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        // console.log(ver);

        // console.log(cookie.token);

        const data = await fetchDashboard(
          cookie.token,
          filteredStatics,
          staticsFilter
        );
        setFetchedData(data); // Set the resolved data
      } catch (error) {
        // removeCookie("token");
        // navigate("/login");
        console.error(error);
      }
    };

    getData();
  }, [cookie.token, filteredStatics, staticsFilter]);
  return (
    <>
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-semibold font-work">
              Overview
            </h1>
            <p className="text-gray100 text-sm font-work mt-1 font-normal">
              Activities summary at a glance
            </p>
          </div>

          <div>
            <div className="flex flex-row justify-end">
              <Select
                className="mb-3"
                defaultValue="weekly"
                value={filteredStatics}
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "weekly",
                    label: "Weekly",
                  },
                  {
                    value: "monthly",
                    label: "Monthly",
                  },
                  {
                    value: "yearly",
                    label: "Yearly",
                  },
                  {
                    value: "custom",
                    label: "Custom",
                  },
                ]}
              />
            </div>
            <div>
              {filteredStatics === "custom" && (
                <RangePicker
                  style={{ width: 300 }}
                  format="YYYY-MM-DD"
                  onPanelChange={onPanelChange}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <div className="flex-1 border border-gray200 rounded-2xl p-4">
            <svg
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="47" height="47" rx="16" fill="#F6F6F6" />
              <path
                d="M21.5 16C19.5672 16 18 17.5657 18 19.498C18 21.4304 19.5672 22.9961 21.5 22.9961C23.4328 22.9961 25 21.4304 25 19.498C25 17.5657 23.4328 16 21.5 16Z"
                fill="#333333"
              />
              <path
                d="M19.5 24.9941C17.5671 24.9941 16 26.5605 16 28.4936V30.9909H27V28.4936C27 26.5605 25.4329 24.9941 23.5 24.9941H19.5Z"
                fill="#333333"
              />
              <path
                d="M28.5 26H28V31H31V28.5C31 27.1193 29.8807 26 28.5 26Z"
                fill="#333333"
              />
              <path
                d="M27.5 20C26.1193 20 25 21.1193 25 22.5C25 23.8807 26.1193 25 27.5 25C28.8807 25 30 23.8807 30 22.5C30 21.1193 28.8807 20 27.5 20Z"
                fill="#333333"
              />
            </svg>
            <div className="flex flex-row items-end gap-2 mt-2">
              <h1 className="text-title text-4xl font-work font-bold">
                {fetchedData ? fetchedData.data.cart.metrics.active_users : 0}
              </h1>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00004 3H15V10H14V4.70711L8.00004 10.7071L5.00004 7.70711L0.853591 11.8536L0.146484 11.1464L5.00004 6.29289L8.00004 9.29289L13.2929 4H8.00004V3Z"
                  fill="#28A745"
                />
              </svg>
            </div>
            <div className="my-2">
              <h3 className="text-gray300 text-base font-work font-medium]">
                Active Users
              </h3>
              <p className="text-gray100 text-sm font-work font-normal">
                0.5k Increased than last 7 days
              </p>
            </div>
          </div>
          <div className="flex-1 border border-gray200 rounded-2xl p-4">
            <svg
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="47" height="47" rx="16" fill="#F6F6F6" />
              <path
                d="M21.5 16C19.5672 16 18 17.5657 18 19.498C18 21.4304 19.5672 22.9961 21.5 22.9961C23.4328 22.9961 25 21.4304 25 19.498C25 17.5657 23.4328 16 21.5 16Z"
                fill="#333333"
              />
              <path
                d="M19.5 24.9941C17.5671 24.9941 16 26.5605 16 28.4936V30.9909H27V28.4936C27 26.5605 25.4329 24.9941 23.5 24.9941H19.5Z"
                fill="#333333"
              />
              <path
                d="M28.5 26H28V31H31V28.5C31 27.1193 29.8807 26 28.5 26Z"
                fill="#333333"
              />
              <path
                d="M27.5 20C26.1193 20 25 21.1193 25 22.5C25 23.8807 26.1193 25 27.5 25C28.8807 25 30 23.8807 30 22.5C30 21.1193 28.8807 20 27.5 20Z"
                fill="#333333"
              />
            </svg>
            <div className="flex flex-row items-end gap-2 mt-2">
              <h1 className="text-title text-4xl font-work font-bold">
                {fetchedData ? fetchedData.data.cart.metrics.subscribers : 0}
              </h1>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00004 3H15V10H14V4.70711L8.00004 10.7071L5.00004 7.70711L0.853591 11.8536L0.146484 11.1464L5.00004 6.29289L8.00004 9.29289L13.2929 4H8.00004V3Z"
                  fill="#28A745"
                />
              </svg>
            </div>
            <div className="my-2">
              <h3 className="text-gray300 text-base font-work font-medium]">
                Subscriber
              </h3>
              <p className="text-gray100 text-sm font-work font-normal">
                0.5k Increased than last 7 days
              </p>
            </div>
          </div>
          <div className="flex-1 border border-gray200 rounded-2xl p-4">
            <svg
              width="48"
              height="47"
              viewBox="0 0 48 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.666504"
                width="47"
                height="47"
                rx="16"
                fill="#F6F6F6"
              />
              <g clipPath="url(#clip0_125_8526)">
                <path
                  d="M27.2427 26.4951H31.6665V28.2529H27.2427V26.4951ZM27.2427 29.1319H31.6665V30.8897H27.2427V29.1319ZM27.2427 23.8584H31.6665V25.6162H27.2427V23.8584ZM19.1269 24.7828L18.5171 24.7764L18.4789 23.8996C21.7413 23.5816 24.6721 21.7693 26.4097 19.0197L25.3531 18.5266L29.3249 16.1113L30.0279 20.7071L28.8048 20.1368C27.9701 21.3886 26.6234 22.9224 24.6854 23.752C22.6945 24.6038 20.5638 24.7828 19.1269 24.7828ZM21.0903 30.8897H16.6665V29.1319H21.0903V30.8897ZM21.9692 26.4951H26.3638V28.2529H21.9692V26.4951ZM21.9692 29.1319H26.3638V30.8897H21.9692V29.1319Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_125_8526">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(16.6665 16)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="flex flex-row items-end gap-2 mt-2">
              <h1 className="text-title text-4xl font-work font-bold">
                ${fetchedData ? fetchedData.data.cart.metrics.revenue : 0}
              </h1>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00004 3H15V10H14V4.70711L8.00004 10.7071L5.00004 7.70711L0.853591 11.8536L0.146484 11.1464L5.00004 6.29289L8.00004 9.29289L13.2929 4H8.00004V3Z"
                  fill="#28A745"
                />
              </svg>
            </div>
            <div className="my-2">
              <h3 className="text-gray300 text-base font-work font-medium]">
                Revenue
              </h3>
              <p className="text-gray100 text-sm font-work font-normal">
                39k Increased that last 7 days
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-6 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-gray100 capitalize text-lg font-semibold font-work">
              {filteredStatics} {staticsFilter}
            </h1>
          </div>
          <div>
            <Select
              defaultValue="weekly"
              className="mb-2"
              style={{
                width: 120,
              }}
              value={staticsFilter}
              onChange={handleRevenueChange}
              options={[
                {
                  value: "revenue",
                  label: "Revenues",
                },
                {
                  value: "activeUsers",
                  label: "Active Users",
                },
                {
                  value: "signUps",
                  label: "Sign Ups",
                },
                {
                  value: "averageSessionTime",
                  label: "Average session time",
                },
                {
                  value: "subscribers",
                  label: "Subscribers",
                },
                {
                  value: "inAppPurchases",
                  label: "In-app purchases",
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-4">
          {fetchedData ? (
            <Chart data={fetchedData.data.chart_data} />
          ) : (
            <div>Loading..</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
