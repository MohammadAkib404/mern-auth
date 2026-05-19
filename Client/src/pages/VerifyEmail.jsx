/* Client/src/pages/VerifyEmail.jsx */

import React, { useContext, useEffect } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyEmail() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);

      const otp = otpArray.join("");

      const { data } = await axios.post(backendUrl + "/api/auth/verify-account", { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-sm p-8 sm:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>

            <span className="text-lg font-semibold tracking-tight text-[#0f172a]">Auth</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a]">Verify Email</h1>

          <p className="mt-3 text-sm text-gray-500 leading-6">Enter the 6-digit verification code sent to your email.</p>
        </div>

        {/* OTP Form */}
        <form onSubmit={onSubmitHandler} className="mt-10">
          <div className="flex justify-between gap-3" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 rounded-xl border border-gray-200 bg-[#f8fafc] text-center text-lg font-medium outline-none focus:border-[#0f172a] transition"
                />
              ))}
          </div>

          <button className="w-full mt-8 rounded-xl bg-[#0f172a] py-3 text-sm font-medium text-white hover:opacity-90 transition">Verify Email</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
