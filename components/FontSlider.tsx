import React from "react";

interface FontSliderProps {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}

function FontSlider({ fontSize, setFontSize }: FontSliderProps) {
  return (
    <div className="mt-4 w-full">
      <input
        type="range"
        className="range range-primary"
        min={1}
        max={100}
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
      />
    </div>
  );
}

export default FontSlider;
