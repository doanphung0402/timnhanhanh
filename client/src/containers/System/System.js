import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, Sidebar } from "./";
import logo from "../../assets/logo.png";
import HeaderSys from "./HeaderSys";
import Footer from "./Footer";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="w-full h-screen flex flex-col items-center overflow-scroll">
      <HeaderSys />
      <div className=" absolute top-0 left-0 border-2 overflow-scroll	">
        {/* <Link to={"/"} >
          <img
            src={logo}
            alt="logo"
            className="w-[250px] h-[50px] object-contain 	"
          />
        </Link> */}
      </div>
      <div className="flex w-full h-screen flex-auto">
        <Sidebar />
        <div className="flex-auto bg-white shadow-md h-full p-4 overflow-y-scroll mt-7 overflow-scroll	">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default System;
