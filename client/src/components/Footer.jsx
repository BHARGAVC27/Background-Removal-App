import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 lg:px-44 py-6">
      <div className="flex items-center justify-center mb-4 md:mb-0">
        <img src={assets.logo} alt="Footer Logo" className="w-36" />
        <span className="mx-3 text-gray-400">|</span>
        <p className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} bg.erase. All rights reserved.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <a 
          href="https://x.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          <img src={assets.twitter_icon} alt="Twitter" className="w-12 h-12" />
        </a>
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          <img src={assets.facebook_icon} alt="Facebook" className="w-12 h-12" />
        </a>
        <a 
          href="https://plus.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          <img src={assets.google_plus_icon} alt="Google Plus" className="w-12 h-12" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
