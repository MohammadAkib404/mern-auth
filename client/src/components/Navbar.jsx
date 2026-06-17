/* Client/src/components/Navbar.jsx */

import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const [open, setOpen] = useState(false);

  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 250);
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer select-none">
        {/* Logo Mark */}
        <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center shadow-sm">
          <span className="text-white text-sm font-semibold tracking-tight">A</span>
        </div>

        {/* Logo Text */}
        <div className="flex flex-col leading-none">
          <span className="text-[17px] font-semibold tracking-tight text-[#0f172a]">Auth</span>

          <span className="text-xs text-gray-500 mt-1">MERN Infrastructure</span>
        </div>
      </div>

      {/* Right Side */}
      {userData ? (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-medium cursor-pointer shadow-sm">
            {userData.name[0].toUpperCase()}
          </div>

          {/* Dropdown */}
          <div
            className={`absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-200 ${
              open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
            }`}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-[#0f172a]">{userData.name}</p>

              <p className="text-xs text-gray-500 mt-1">Auth User</p>
            </div>

            {!userData.isAccountVerified && (
              <button onClick={sendVerificationOtp} className="w-full text-left px-4 py-3 text-sm text-[#0f172a] hover:bg-gray-50 transition">
                Verify Email
              </button>
            )}

            <button onClick={logout} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2.5 rounded-xl bg-[#0f172a] text-white text-sm font-medium hover:opacity-90 transition shadow-sm"
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
