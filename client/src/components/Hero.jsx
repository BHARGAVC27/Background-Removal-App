import React from "react";
import { assets } from "../../assets/assets";
import { name } from './../../node_modules/tar/dist/esm/types';

const Hero = () => {
  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      {/* Left Section */}
      <div >
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight ">
          Remove the <br className="max-md-hidden" /> <span className="bg-gradient-to-r from-blue-500 to-yellow-900 text-transparent bg-clip-text">background </span>
          from <br /> images for free
        </h1>
        <p className="my-6 text-[15px] text-gray-500 max-w-[500px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div>
            <input type="file" id="image-upload" hidden />
            <label htmlFor="image-upload" className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-l from-blue-500 to-yellow-900 hover:from-blue-600 hover:to-yellow-800 text-white text-sm font-bold transition-all duration-[1500ms] ease-in-out hover:scale-105 hover:shadow-lg " style={{transition: 'all 0.5s ease-in-out'}}>
              <img src={assets.upload_btn_icon} alt="Upload" className="w-3 sm:w-4" />
              <p >Upload your image</p>
            </label>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full max-w-md">
        <img src={assets.header_img} alt="Hero" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
