import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth";
import { App } from "antd";
function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const { message } = App.useApp();
  const handleChange = (e) => {
    if (error) {
      setError("");
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const call = await forgotPassword(formData);

      if (!call.data?.success) {
        console.log(call);
        return;
      }

      console.log();
      message.success(call.data.message);
      console.log(call);
      localStorage.setItem("email_for_pass", formData.email);
      navigate("/otp-verification");

      // navigate("/otp-verification");
    } catch (error) {
      console.error("Error:", error);
      setError("Please input a valid email");

      if (error.response) {
      } else if (error.request) {
        message.error("No response from the server. Check your connection.");
      } else {
        message.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#f6f6f6] justify-center">
      <div className="container mx-auto flex flex-row items-start justify-center">
        <div className="bg-white rounded-2xl p-8 w-[50%]">
          <h1 className="text-title mb-2 text-2xl font-work font-semibold">
            Forget Password?
          </h1>
          <p className={`text-subtitle text-base font-work font-normal`}>
            Don't worry we are here to help you.
          </p>

          <form onSubmit={handleSubmit} className={`mt-4`}>
            <div className="flex flex-row px-4 bg-white items-center border border-90 rounded-2xl">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 5L7.5 9L14.5 5M1.5 2H13.5C14.0523 2 14.5 2.44772 14.5 3V13C14.5 13.5523 14.0523 14 13.5 14H1.5C0.947716 14 0.5 13.5523 0.5 13V3C0.5 2.44772 0.947715 2 1.5 2Z"
                  stroke="#24272B"
                />
              </svg>

              <input
                type="text"
                placeholder="Email"
                className={`focus:outline-none p-4 w-full`}
                name="email"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {error ? <p className="pt-2 text-danger text-end">{error}</p> : ""}
            <button
              type="submit"
              className="bg-primary text-white p-4 rounded-2xl mt-4 w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
