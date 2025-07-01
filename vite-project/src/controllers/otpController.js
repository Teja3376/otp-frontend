import axios from "axios";

export const sendOtp = async (email, name) => {
  // return axios.post("https://otp-backend-production.up.railway.app/send-otp", { email, name });
  return axios.post(" http://localhost:5000/send-otp", { email, name });
};

export const verifyOtp = async (email, otp) => {
  // return axios.post("https://otp-backend-production.up.railway.app/verify-otp", { email, otp });
  return axios.post("http://localhost:5000/verify-otp", { email, otp });
};

export const resendOtp = async (email) => {
  // return axios.post("https://otp-backend-production.up.railway.app/send-otp", { email });
  return axios.post("http://localhost:5000/send-otp", { email });
};