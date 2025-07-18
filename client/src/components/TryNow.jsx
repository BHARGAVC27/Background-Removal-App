import React from "react";
import { assets } from "../../assets/assets";

const TryNow = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4 lg:px-44 pb-10">
      <h1
        className="text-3xl md:text-4xl font-bold mb-6 text-center leading-tight sm:mb-10
        bg-gradient-to-r from-neutral-700 to-slate-300 text-transparent bg-clip-text max-w-3xl"
      >
        Try Our Background Removal Tool Now, <br /> It's Free and Easy to Use!
      </h1>
      <div>
            <input type="file" id="image-upload" hidden />
            <label htmlFor="image-upload" className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-l from-blue-500 to-yellow-900 hover:from-blue-600 hover:to-yellow-800 text-white text-sm font-bold transition-all duration-[1500ms] ease-in-out hover:scale-105 hover:shadow-lg " style={{transition: 'all 0.5s ease-in-out'}}>
              <img src={assets.upload_btn_icon} alt="Upload" className="w-3 sm:w-4" />
              <p >Upload your image</p>
            </label>
        </div>
    </div>
  );
};

export default TryNow;
