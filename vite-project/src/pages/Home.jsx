import React from "react";
import email from "../assets/emailLogo.png";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 h-150 ">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-5xl font-bold text-center mt-10 text-blue-500">
            Welcome to the Email OTP Login System
          </h1>
          <p className="text-lg w-100 mt-5 text-gray-600 text-center">
            Click the Image for Email OTP Login
          </p>
          <a href="/email" className="border-none" >
            <img src={email} alt="Email Logo" className="w-40 h-40 " />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
