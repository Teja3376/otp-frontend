import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Verifyotp from "../assets/Verifyotp.jpg";
import { verifyOtp, resendOtp } from "../controllers/otpController";
import { toast } from "react-hot-toast";

export default function OtpVerifyPage({ setToken, timer, setTimer }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, setTimer]);

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await verifyOtp(email, otp);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      toast.success("Logged in!");
      setTimeout(() => {
        navigate("/main");
      }, 1200);
    } catch {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) {
      toast.error("Please wait before resending OTP");
      return;
    }
    try {
      setLoading(true);
      await resendOtp(email);
      toast.success("OTP resent!");
      setTimer(60);
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-violet-200 px-2">
      <div className="flex flex-col md:flex-row items-center bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-12 gap-8 w-full max-w-2xl">
        <div className="hidden md:block w-64">
          <img className="rounded-2xl w-full" src={Verifyotp} alt="Otp" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold text-violet-700 mb-4 text-center md:text-left flex items-center gap-2">
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
            Verify OTP
          </h1>
          <p className="mb-2 text-gray-600 text-center md:text-left">
            OTP sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>
          <input
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 bg-white/40 backdrop-blur focus:outline-none focus:ring-2 focus:ring-violet-500 transition placeholder:text-violet-400"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-35 h-12 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-semibold text-lg shadow flex items-center justify-center"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
            <button
              className="w-full sm:w-38 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold text-lg shadow"
              onClick={handleResendOtp}
              disabled={timer > 0 || loading}
            >
              Resend OTP {timer > 0 ? `(${timer}s)` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
