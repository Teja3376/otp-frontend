import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainHead({ setToken, setEmail }) {
  const [name, setName] = useState("");
  const email = localStorage.getItem("email") || ""; // Get email from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // If you store email in localStorage, use that
    getName();
  },[email] );

  const getName = async () => {
    try {
      const response = await axios.get(`https://otp-backend-production.up.railway.app/get-name?email=${email}`);
      setName(response.data.name);
      console.log("Name fetched:", response.data.name);
      console.log("Email used for fetching name:", email);
    } catch (error) {
      console.error("Error fetching name:", error);
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
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="flex flex-wrap justify-center gap-10">
          <div className=" flex flex-col w-100 h-100 rounded-md gap-4">
            <h1 className="text-4xl font-bold text-violet-600 mt-4 pl-4">
              Hello, I am
            </h1>
            <h2 className="text-5xl font-bold text-violet-500 pl-4">
              {name}
            </h2>
            <p className=" pl-4 text-xl font-bold" >
              MERN Stack Developer
            </p>
            


          </div>
          <div className=" flex w-100 h-100 items-center justify-center ">
            <img
              className="w-full size-cover rounded-2xl"
              src = "https://avatars.githubusercontent.com/u/122626646?v=4"
              alt="Profile"
            />
          </div>
        </div>
        <button
          className="w-30 h-10 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
}
