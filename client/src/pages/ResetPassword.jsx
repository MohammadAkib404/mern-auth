/* Client/src/pages/ResetPassword.jsx */

import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const { backendUrl } = useContext(AppContent);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });

      data.success ? toast.success(data.message) : toast.error(data.message);

      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((e) => e.value);

    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      data.success ? toast.success(data.message) : toast.error(data.message);

      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-sm p-8 sm:p-10">
        {/* Step 1 */}
        {!isEmailSent && (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a]">Reset Password</h1>

              <p className="mt-3 text-sm text-gray-500 leading-6">Enter your registered email address.</p>
            </div>

            <form onSubmit={onSubmitEmail} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-[#0f172a]">Email Address</label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 outline-none focus:border-[#0f172a] transition"
                />
              </div>

              <button className="w-full rounded-xl bg-[#0f172a] py-3 text-sm font-medium text-white hover:opacity-90 transition">Continue</button>
            </form>
          </>
        )}

        {/* Step 2 */}
        {!isOtpSubmitted && isEmailSent && (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a]">Enter OTP</h1>

              <p className="mt-3 text-sm text-gray-500 leading-6">Enter the verification code sent to your email.</p>
            </div>

            <form onSubmit={onSubmitOtp} className="mt-10">
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

              <button className="w-full mt-8 rounded-xl bg-[#0f172a] py-3 text-sm font-medium text-white hover:opacity-90 transition">Verify OTP</button>
            </form>
          </>
        )}

        {/* Step 3 */}
        {isOtpSubmitted && isEmailSent && (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a]">Create New Password</h1>

              <p className="mt-3 text-sm text-gray-500 leading-6">Choose a strong new password for your account.</p>
            </div>

            <form onSubmit={onSubmitNewPassword} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-[#0f172a]">New Password</label>

                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 outline-none focus:border-[#0f172a] transition"
                />
              </div>

              <button className="w-full rounded-xl bg-[#0f172a] py-3 text-sm font-medium text-white hover:opacity-90 transition">Reset Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
