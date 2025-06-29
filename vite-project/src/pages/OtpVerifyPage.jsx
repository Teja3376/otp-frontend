import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Verifyotp from "../assets/Verifyotp.jpg";
import { verifyOtp, resendOtp } from "../controllers/otpController";

export default function OtpVerifyPage({ setToken, timer, setTimer }) {
  const [otp, setOtp] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [dialogType, setDialogType] = useState("success");
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
      setDialogType("error");
      setDialogMsg("Please enter the OTP");
      setShowDialog(true);
      return;
    }
    try {
      setLoading(true);
      const res = await verifyOtp(email, otp);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setDialogType("success");
      setDialogMsg("Logged in!");
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
        navigate("/main");
      }, 1200);
    } catch {
      setDialogType("error");
      setDialogMsg("Invalid OTP");
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) {
      setDialogType("error");
      setDialogMsg("Please wait before resending OTP");
      setShowDialog(true);
      return;
    }
    try {
      setLoading(true);
      await resendOtp(email);
      setDialogType("success");
      setDialogMsg("OTP resent!");
      setShowDialog(true);
      setTimer(60);
    } catch {
      setDialogType("error");
      setDialogMsg("Failed to resend OTP");
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-violet-200 px-2">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl p-6 md:p-12 gap-8 w-full max-w-2xl">
        <div className="hidden md:block w-64">
          <img className="rounded-2xl w-full" src={Verifyotp} alt="Otp" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold text-violet-700 mb-4 text-center md:text-left">
            Verify OTP
          </h1>
          <p className="mb-2 text-gray-600 text-center md:text-left">
            OTP sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>
          <input
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-auto h-12 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-semibold text-lg shadow"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
            <button
              className="w-full sm:w-auto h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold text-lg shadow"
              onClick={handleResendOtp}
              disabled={timer > 0 || loading}
            >
              Resend OTP {timer > 0 ? `(${timer}s)` : ""}
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            className={`
              bg-white rounded-xl shadow-2xl px-8 py-6 min-w-[250px] max-w-xs
              flex flex-col items-center
              transition-all duration-300
              ${
                dialogType === "success"
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-90"
              }
              animate-pop
            `}
            style={{
              animation: "pop 0.3s cubic-bezier(.4,2,.6,1) both",
            }}
          >
            <div
              className={`mb-2 text-3xl ${
                dialogType === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {dialogType === "success" ? "✔️" : "❌"}
            </div>
            <div className="text-lg font-semibold text-center mb-2">
              {dialogMsg}
            </div>
            <button
              className="mt-2 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
              onClick={() => setShowDialog(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Dialog Animation Keyframes */}
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.7); opacity: 0; }
            80% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
