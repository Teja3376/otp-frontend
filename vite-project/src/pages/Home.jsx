import React from "react";
import email from "../assets/emailLogo.png";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-violet-100 to-blue-200 px-2">
      <div className="glass-card shadow-2xl p-10 rounded-3xl flex flex-col items-center gap-8 w-full max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-violet-700 tracking-tight drop-shadow">
          Welcome to the{" "}
          <span className="text-blue-500">Email OTP</span> Login System
        </h1>
        {/* <p className="text-lg md:text-xl text-gray-600 text-center">
          Secure, simple, and fast login with your email. <br />
          Click the envelope to get started!
        </p> */}
        <a
          href="/email"
          className="border-none outline-none focus:outline-none group"
        >
          <div className="transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
            <img
              src={email}
              alt="Email Logo"
              className="w-40 h-40 rounded-2xl shadow-lg border-4 border-white/60 bg-white/70 backdrop-blur"
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              }}
            />
            <div className="text-center mt-3 text-violet-600 font-semibold text-lg animate-bounce">
              Login with Email OTP
            </div>
          </div>
        </a>
      </div>
      <style>
        {`
          .glass-card {
            background: rgba(255,255,255,0.35);
            border-radius: 1.5rem;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,0.18);
          }
        `}
      </style>
    </div>
  );
};

export default Home;
