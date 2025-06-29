import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import msgEmail from "../assets/msgEmail.jpg";
import { sendOtp } from "../controllers/otpController";

const Email = ({ setEmail, setTimer }) => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await sendOtp(input, name);
      localStorage.setItem("email", input);
      setEmail(input);
      toast.success("OTP sent!");
      setTimer(60);
      navigate("/verify");
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center h-screen gap-15 border-2">
        <div className="w-80 h-100 flex items-center justify-center rounded-md shadow-lg">
          <img className="size-full rounded-2xl" src={msgEmail} alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-left mb-5">Email OTP Login</h1>
          <input
            className="w-80 h-10 border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <input
            className="w-80 h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300"
            type="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter email"
            required
          />
          <button
            className="w-30 h-10 bg-violet-500 text-white rounded-md mt-7 hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                <span className="ml-2">Sending...</span>
              </div>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Email;
