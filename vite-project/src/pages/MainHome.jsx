import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getName } from "../controllers/userController";

export default function MainHead({ setToken, setEmail }) {
  const [name, setName] = useState("");
  const email = localStorage.getItem("email") || "";
  const navigate = useNavigate();

  useEffect(() => {
    getNameHandler();
    // eslint-disable-next-line
  }, [email]);

  const getNameHandler = async () => {
    try {
      const response = await getName(email);
      setName(response.data.name);
    } catch (error) {
      setName("User");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken("");
    setEmail("");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-violet-100 to-blue-200 px-2">
      <div className="glass-card shadow-2xl p-8 md:p-14 rounded-3xl flex flex-col md:flex-row items-center gap-10 w-full max-w-3xl">
        <div className="flex flex-col items-center md:items-start w-full md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-violet-700 mb-2 tracking-tight drop-shadow">
            Welcome, {name}!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            You are logged in with{" "}
            <span className="font-semibold text-violet-600">{email}</span>
          </p>
          <p className="text-xl font-bold text-blue-500 mb-8">
            MERN Stack Developer
          </p>
          <button
            className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold text-lg shadow-lg hover:from-violet-700 hover:to-blue-600 transition-all duration-200 active:scale-95 focus:outline-none"
            onClick={logout}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Logout
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center w-full md:w-1/3">
          <img
            className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg border-4 border-white/60"
            src="https://avatars.githubusercontent.com/u/122626646?v=4"
            alt="Profile"
          />
        </div>
      </div>
      <style>
        {`
          .glass-card {
            background: rgba(255,255,255,0.35);
            border-radius: 1.5rem;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,0.18);
          }
        `}
      </style>
    </div>
  );
}
