/* Client/src/pages/Login.jsx */

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-sm p-8 sm:p-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a]">{state === "Sign Up" ? "Create account" : "Welcome back"}</h1>

          <p className="mt-3 text-sm text-gray-500 leading-6">
            {state === "Sign Up" ? "Create your account to continue." : "Login to your account to continue."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="mt-8 space-y-5">
          {state === "Sign Up" && (
            <div>
              <label className="text-sm font-medium text-[#0f172a]">Full Name</label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 outline-none focus:border-[#0f172a] transition"
              />
            </div>
          )}

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

          <div>
            <label className="text-sm font-medium text-[#0f172a]">Password</label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 outline-none focus:border-[#0f172a] transition"
            />
          </div>

          {state === "Login" && (
            <div className="flex justify-end">
              <button type="button" onClick={() => navigate("/reset-password")} className="text-sm text-gray-500 hover:text-[#0f172a] transition">
                Forgot password?
              </button>
            </div>
          )}

          <button className="w-full rounded-xl bg-[#0f172a] py-3 text-sm font-medium text-white hover:opacity-90 transition">{state}</button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <button onClick={() => setState("Login")} className="font-medium text-[#0f172a]">
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button onClick={() => setState("Sign Up")} className="font-medium text-[#0f172a]">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
