import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import msgEmail from "../assets/msgEmail.jpg";
import { sendOtp } from "../controllers/otpController";

const Email = ({ setEmail, setTimer }) => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [dialogType, setDialogType] = useState("success");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!input || !name) {
      setDialogType("error");
      setDialogMsg("Please enter both name and email");
      setShowDialog(true);
      return;
    }
    try {
      setLoading(true);
      await sendOtp(input, name);
      localStorage.setItem("email", input);
      setEmail(input);
      setDialogType("success");
      setDialogMsg("OTP sent!");
      setShowDialog(true);
      setTimer(60);
      setTimeout(() => {
        setShowDialog(false);
        navigate("/verify");
      }, 1200);
    } catch (err) {
      setDialogType("error");
      setDialogMsg("Failed to send OTP");
      setShowDialog(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-200 to-blue-100 px-2">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl p-6 md:p-12 gap-8 w-full max-w-2xl">
        <div className="hidden md:block w-64">
          <img className="rounded-2xl w-full" src={msgEmail} alt="" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center md:text-left">
            Email OTP Login
          </h1>
          <input
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <input
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            type="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter email"
            required
          />
          <button
            className="w-full h-12 bg-violet-600 text-white rounded-lg mt-2 hover:bg-violet-700 transition font-semibold text-lg shadow"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                <span className="ml-2">Sending...</span>
              </div>
            ) : (
              "Send OTP"
            )}
          </button>
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
};

export default Email;
