import React, { useState } from "react";

interface YSliderProps {
  canvasHeight: number;
  textPosition: number;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function YSlider({
  canvasHeight,
  textPosition,
  handleSliderChange,
}: YSliderProps) {
  return (
    <div className="w-full">
      <input
        type="range"
        className="range range-primary"
        min="0"
        max={canvasHeight - 30}
        value={textPosition}
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default YSlider;
