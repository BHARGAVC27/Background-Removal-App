import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 py-6 lg:px-44 bg-gray-100">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-32 sm:w-44" />
      </Link>
      {isSignedIn ? (
        <div>
          <UserButton/>
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
