import React from "react";
import { assets } from "../../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = React.useState(20);
  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-16 pb-10 px-4 lg:px-44">
      <h1
        className="text-3xl md:text-4xl font-bold mb-12 text-center leading-tight sm:mb-20
        bg-gradient-to-r from bg-neutral-700 to-slate-300 text-transparent bg-clip-text max-w-3xl "
      >
        Remove Background With High <br /> Accuracy And Quality
      </h1>

      <div className="relative w-full max-w-3xl bg-gray-200 rounded-xl m-auto overflow-hidden">
        <img
          src={assets.image_w_bg}
          className="absolute top-0 left-0 w-full h-full "
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
          alt="with_background"
        />

        <img
          src={assets.image_wo_bg}
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}% )` }}
          alt="without_background"
        />

        <input
          type="range"
          min="0"
          max="100"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
          value={sliderPosition}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default BgSlider;
