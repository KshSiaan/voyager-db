import React, { useState } from "react";
import { Button, Flex, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../api/auth";
import { App } from "antd";
import { useCookies } from "react-cookie";
function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { message } = App.useApp();
  const [, setCookie] = useCookies(["token"]);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const call = await verifyOtp({ otp: otp });
      if (call.data.success) {
        setCookie("token", call.data.data);
        navigate("/new-password");
      } else if (call.data.message) {
        setError(call.data.message);
        message.error(call.data.message);
      } else {
        setError("Please input a valid OTP");
        message.error("Please input valid OTP");
      }

      console.log(call);
    } catch (error) {
      setError("Please input a valid OTP");
      console.error("OTP verification failed", error);
    }
  };
  const resend = async () => {
    const email = localStorage.getItem("email_for_pass");

    try {
      const call = await resendOtp({ email: email });
      if (!call.data?.success) {
        console.log(call);
        return;
      }
      turnSendAg();
      console.log();
      message.success(call.data.message);
      console.log(call);

      // navigate("/otp-verification");
    } catch (error) {
      console.error("Error:", error);

      setError("");

      if (error.response) {
      } else if (error.request) {
        message.error("No response from the server. Check your connection.");
      } else {
        message.error("Something went wrong. Please try again.");
      }
    }
  };

  function turnSendAg() {
    setCountdown(60);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const onChange = (value) => {
    setOtp(value);
    setTimeout(() => setError(""), 0);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#f6f6f6] justify-center">
      <div className="container mx-auto flex flex-row items-start justify-center">
        <div className="bg-white rounded-2xl p-8 w-[50%]">
          <h1 className="text-title mb-2 text-2xl font-work font-semibold">
            OTP Verification
          </h1>
          <p className={`text-subtitle text-base font-work font-normal`}>
            We just sent a verification code to <br />
            <b>midul@gmail.com</b>
          </p>

          <form onSubmit={handleSubmit} className={`mt-4`}>
            <Flex gap="middle" align="flex-start" vertical>
              <h4 className="text-title text-base font-work font-bold">
                Enter the code
              </h4>
              <Input.OTP
                size="large"
                formatter={(str) => str.toUpperCase()}
                onChange={onChange}
                value={otp} // Bind state to input
              />
            </Flex>
            {error ? <p className="pt-2 text-danger text-end">{error}</p> : ""}
            <button
              type="submit"
              className="bg-primary text-white p-4 rounded-2xl mt-4 w-full"
            >
              Continue
            </button>

            <p
              className={`text-red-500 text-end py-2 font-semibold ${
                countdown > 0 ? "" : "hidden"
              }`}
            >
              Can not send again before {countdown}s
            </p>
            <p className="text-black mt-4 text-sm font-work font-normal text-center">
              Didn&apos;t get OTP?
              <Button
                onClick={resend}
                type="button"
                variant="link"
                className={`text-primary cursor-pointer ${
                  countdown > 0 ? "!text-gray-200" : ""
                }`}
                disabled={countdown > 0}
              >
                Send Again
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
