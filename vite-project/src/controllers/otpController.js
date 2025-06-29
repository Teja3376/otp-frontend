import axios from "axios";

export const sendOtp = async (email, name) => {
  return axios.post("http://localhost:5000/send-otp", { email, name });
};

export const verifyOtp = async (email, otp) => {
  return axios.post("http://localhost:5000/verify-otp", { email, otp });
};

export const resendOtp = async (email) => {
  return axios.post("http://localhost:5000/send-otp", { email });
};