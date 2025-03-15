import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { App } from "antd";
import { useCookies } from "react-cookie";
// import { usePostLoginMutation } from "../../redux/features/login";
function Login() {
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const { message } = App.useApp();
  // const [setData, { isLoading, isError, status, error, data }] =
  //   usePostLoginMutation();

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (cookie.token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    if (formData.email == "" || formData.password == "") {
      setError("Please fill up the required fields");
    }
    e.preventDefault();
    console.log(formData);

    try {
      const call = await login(formData);
      console.log("call: ", call);

      if (!call.data?.success) {
        console.log(call);
        setError("Please input valid Email & Password");
        return;
      }

      setError("");
      message.success(call.data.message);
      setCookie("token", call.data.data.token);
      console.log("token: ", call.data.data.token);

      // localStorage.setItem("token", call.data.data.token);
      // const tokenData = localStorage.getItem("token");
      // console.log("51: ", tokenData);

      navigate("/");

      // const response = await setData(formData);
      // console.log(response);
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // setError("Please input valid Email & Password");
      } else if (error.request) {
        message.error("No response from the server. Check your connection.");
      } else {
        message.error("Something went wrong. Please try again.");
      }
    }
  };

  // console.log(showConfirmPassword);

  return (
    <div className="h-screen flex flex-col items-center bg-[#f6f6f6] justify-center">
      <div className="container mx-auto flex flex-row items-start justify-center">
        <div className="bg-white rounded-2xl p-8 w-[50%]">
          <h1 className="text-title mb-8 text-center text-4xl font-work font-semibold">
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="flex flex-row px-4 mb-3 bg-white items-center border border-gray-300 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="focus:outline-none p-4 w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Confirm Password */}
            <div className="flex flex-row px-4 bg-white items-center border border-gray-300 rounded-2xl">
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
                type={!showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="password"
                className="focus:outline-none p-4 w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {showConfirmPassword ? (
                <svg
                  onClick={() => setShowConfirmPassword(false)}
                  width="15"
                  className="cursor-pointer"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.49665 3.16634C3.56112 4.34909 5.18599 5.50082 7.5 5.50082C9.81401 5.50082 11.4389 4.34909 12.5034 3.16634C13.0359 2.57458 13.4219 1.98112 13.6744 1.53557C13.8003 1.31329 13.8923 1.12921 13.952 1.00246C13.9819 0.939122 14.0037 0.890225 14.0176 0.858172C14.0245 0.842149 14.0295 0.830348 14.0325 0.82307L14.0356 0.815589L14.0359 0.814794C14.0358 0.814951 14.0358 0.815128 14.5 1.00082C14.9642 1.18652 14.9642 1.18674 14.9641 1.18697L14.9638 1.18753L14.9633 1.189L14.9615 1.19331L14.9557 1.20727C14.9509 1.21891 14.944 1.23518 14.9351 1.25578C14.9173 1.29697 14.8912 1.3555 14.8566 1.42888C14.7874 1.57557 14.6841 1.78211 14.5444 2.02858C14.2656 2.52053 13.8391 3.17707 13.2467 3.83531C13.0638 4.0385 12.8645 4.24244 12.6483 4.44205L14.3536 6.14727L13.6465 6.85438L11.8716 5.07954C10.8638 5.80979 9.58254 6.3839 8 6.48499L8.00001 8.50082L7.00001 8.50083L7 6.48499C5.41747 6.3839 4.13622 5.8098 3.12839 5.07955L1.35356 6.85438L0.646458 6.14727L2.35167 4.44206C2.13553 4.24244 1.93624 4.03851 1.75336 3.83531C1.16095 3.17707 0.734393 2.52053 0.455623 2.02858C0.315956 1.78211 0.212603 1.57557 0.143451 1.42888C0.108856 1.35549 0.0827632 1.29697 0.0649147 1.25578C0.0559888 1.23518 0.0491194 1.21891 0.0442744 1.20726L0.0385192 1.19331L0.0367715 1.189L0.0361787 1.18753L0.0359524 1.18697C0.0358587 1.18673 0.0357727 1.18652 0.500012 1.00082C0.96425 0.81513 0.96418 0.814954 0.964117 0.814796L0.964028 0.814575L0.964441 0.815591L0.967528 0.823073C0.970557 0.83035 0.975528 0.842151 0.982471 0.858174C0.996361 0.890227 1.01812 0.939125 1.04798 1.00246C1.10773 1.12921 1.19969 1.31329 1.32565 1.53557C1.57812 1.98112 1.96407 2.57458 2.49665 3.16634ZM0.963985 0.814469C0.963969 0.814429 0.963983 0.814465 0.964028 0.814575L0.963985 0.814469Z"
                    fill="#24272B"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setShowConfirmPassword(true)}
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
              )}
            </div>
            {error ? (
              <div className="text-sm text-danger text-end p-2">{error}</div>
            ) : (
              ""
            )}
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-primary text-white p-4 rounded-2xl mt-4 w-full"
            >
              Login
            </button>
            <div className={`flex flex-row justify-end`}>
              <Link
                to={"/forgot-password"}
                className={`text-primary underline cursor-pointer text-sm font-work font-semibold mt-4`}
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
