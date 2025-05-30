import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { App } from "antd";
import { newPass, tokenIsValid } from "../../api/auth";
function NewPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfrimPassword] = useState(false);
  const [cookie, , removeCookie] = useCookies(["token"]);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    async function validate() {
      try {
        const verify = await tokenIsValid();
        if (!verify) {
          message.warning("Login first");
          navigate("/login");
        }
      } catch (error) {
        message.warning("Login first");
        navigate("/login");
        // console.log(error);
      }
    }
    validate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.new_password.length < 8) {
      setError("password must be at least 8 characters");
      return;
    } else if (formData.confirm_password < 8) {
      setError("password must be at least 8 characters");
      return;
    }

    try {
      const email = localStorage.getItem("email_for_pass");
      const call = await newPass(cookie.token, {
        email: email,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });

      if (call.data.status == "200") {
        message.success(call.data.message);
        localStorage.removeItem("email_for_pass");
        try {
          const callVerify = await tokenIsValid(cookie.token);
          if (!callVerify.data) {
            removeCookie("token");
            navigate("/login");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          if (cookie.token) {
            removeCookie("token");
            navigate("/login");
          }
        }
        navigate("/");
      }
    } catch (error) {
      message.error("Something went wrong!");
      console.log(error);
    }

    // navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#f6f6f6] justify-center">
      <div className="container mx-auto flex flex-row items-start justify-center">
        <div className="bg-white rounded-2xl p-8 w-[50%]">
          <h1 className="text-title mb-2 text-2xl font-work font-semibold">
            Change Password
          </h1>
          <p className={`text-subtitle text-base font-work font-normal`}>
            password must be at least 8 characters with uppercase, lowercase
            letters, numbers and special characters (e.g. : #$!%)
          </p>

          <form onSubmit={handleSubmit} className={`mt-4`}>
            <div>
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
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      placeholder="New Password"
                      className={`focus:outline-none p-4 w-full`}
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
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      placeholder="Confirm Password"
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
                  {error ? (
                    <p className="pt-2 text-danger text-end">{error}</p>
                  ) : (
                    ""
                  )}
                  <button
                    type="submit"
                    className="rounded-xl py-4 mt-4 cursor-pointer text-center font-work bg-primary text-white text-sm font-bold w-full"
                    onClick={handleSubmit}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
