import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import msgEmail from "../assets/msgEmail.jpg";
import { sendOtp } from "../controllers/otpController";
import { toast } from "react-hot-toast";

const Email = ({ setEmail, setTimer }) => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!input || !name) {
      toast.error("Please enter both name and email");
      return;
    }
    try {
      setLoading(true);
      await sendOtp(input, name);
      localStorage.setItem("email", input);
      setEmail(input);
      toast.success("OTP sent!");
      setTimer(60);
      setTimeout(() => {
        navigate("/verify");
      }, 1200);
    } catch (err) {
      toast.error("Failed to send OTP");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-200 to-blue-100 px-2">
      <div className="flex flex-col md:flex-row items-center bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-12 gap-8 w-full max-w-2xl">
        <div className="hidden md:block w-64">
          <img className="rounded-2xl w-full" src={msgEmail} alt="" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center md:text-left flex items-center gap-2">
            <svg
              className="w-8 h-8 text-violet-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Email OTP Login
          </h1>
          <input
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 bg-white/40 backdrop-blur focus:outline-none focus:ring-2 focus:ring-violet-500 transition placeholder:text-violet-400"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <input
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 bg-white/40 backdrop-blur focus:outline-none focus:ring-2 focus:ring-violet-500 transition placeholder:text-violet-400"
            type="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter email"
            required
          />
          <button
            className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-lg mt-2 hover:from-violet-700 hover:to-blue-600 transition font-semibold text-lg shadow flex items-center justify-center"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-6 w-6 mr-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Email;
