import React from "react";
import logo from "../assets/logo.png";

const Nav = () => {
  return (
    <div className="flex justify-between p-4  font-bold">
        <a href="/" >
        <img className="w-30" src={logo} alt="Ryzer-logo" />
        </a>
    </div>
  );
};

export default Nav;
