import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/appContext.jsx";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn && user) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center justify-between px-4 py-6 lg:px-44 bg-gray-100">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-32 sm:w-44" />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/buy-credit"
            className="group transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200">
              <img src={assets.credit_icon} alt="Credits" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-medium">Credits:</span>
              <span className="text-sm sm:text-base font-bold text-blue-600">
                {credit !== false ? credit : "..."}
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-gray-700 font-medium text-base">
              Hi, {user?.firstName || user?.fullName || "User"}!
            </span>
            <UserButton />
          </div>
        </div>
      ) : (
        <button
          onClick={() => openSignIn()}
          className="bg-gradient-to-bl from-blue-600 to-yellow-600 text-white flex items-center gap-4 px-4 py-2 rounded-full sm:py-3 sm:px-8 text-sm font-semibold cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          Get Started{" "}
          <img src={assets.arrow_icon} alt="Arrow" className="w-3 sm:w-4 " />
        </button>
      )}
    </div>
  );
};

export default Navbar;
