import React, { useState } from "react";

const TwoHandleSlider: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(20);
  const [maxValue, setMaxValue] = useState<number>(80);

  // Function to update the slider track background dynamically
  const updateSliderTrack = () => {
    return `linear-gradient(to right, #333 ${minValue}%, #fff ${minValue}%, #fff ${maxValue}%, #333 ${maxValue}%)`;
  };

  // Ensure the handles do not overlap
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minValue) {
      setMaxValue(value);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <label htmlFor="range" className="block text-sm font-medium text-white mb-2">
        Range Slider
      </label>
      <div className="relative">
        {/* First Range Handle */}
        <input
          type="range"
          id="range1"
          min="0"
          max="100"
          value={minValue}
          step="1"
          onChange={handleMinChange}
          className="range-slider"
        />
        
        {/* Second Range Handle */}
        <input
          type="range"
          id="range2"
          min="0"
          max="100"
          value={maxValue}
          step="1"
          onChange={handleMaxChange}
          className="range-slider"
        />

        {/* Slider Track */}
        <div
          id="slider-track"
          className="absolute inset-0 rounded-full h-2"
          style={{ background: updateSliderTrack() }}
        ></div>

        {/* Values */}
        <div
          id="range-label"
          className="absolute inset-0 flex justify-between items-center px-2 text-xs text-white"
        >
          <span>{minValue}</span>
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  );
};

export default TwoHandleSlider;