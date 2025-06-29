import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Verifyotp from "../assets/Verifyotp.jpg";
export default function OtpVerifyPage({setToken, timer, setTimer }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, setTimer]);

  const verifyOtp = async () => {
    try {
      const res = await axios.post("https://otp-backend-production.up.railway.app/verify-otp", {
        email,
        otp,
      });
      setLoading(true);
      localStorage.setItem("token", res.data.token);

      setToken(res.data.token);
      toast.success("Logged in!");
      navigate("/main");
    } catch {
      toast.error("Invalid OTP");
    }
    finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      if (timer > 0) {
        toast.error("Please wait before resending OTP");
        return;
      }
      await axios.post("https://otp-backend-production.up.railway.app/send-otp", { email });
      toast.success("OTP resent!");
      setTimer(60);
    } catch {
      toast.error("Failed to resend OTP");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" flex flex-wrap items-center justify-center h-screen gap-15 border-2">
        <div className="w-80 h-100 flex items-center justify-center rounded-md shadow-lg">
          <img className=" size-full rounded-2xl" src={Verifyotp} alt="Otp" />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <h1 className='text-3xl font-bold text-left'>Hello, User</h1>
          <p>OTP sent to {email}</p>
          <input
            className="w-80 h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <div className="flex gap-9">
            <button
              className="w-30 h-10 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
              onClick={verifyOtp}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
            <button
              className="w-40 h-10 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
              onClick={resendOtp}
              disabled={timer > 0}
            >
              Resend OTP ({timer}s)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
