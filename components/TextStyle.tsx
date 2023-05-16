import React from "react";

interface TextStyleProps {
  selectedTextStyle: string;
  setSelectedTextStyle: React.Dispatch<React.SetStateAction<string>>;
  textStyles: string[];
}

function TextStyle({
  selectedTextStyle,
  setSelectedTextStyle,
  textStyles,
}: TextStyleProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {textStyles.map((textStyle, index) => (
        <button
          key={index}
          className={`text-style ${
            selectedTextStyle === textStyle
              ? "bg-white text-black"
              : "border-2 border-white/50 bg-black text-white/50"
          }
          w-full rounded-full p-2 text-xl font-bold
          `}
          onClick={() => setSelectedTextStyle(textStyle)}
        >
          {textStyle}
        </button>
      ))}
    </div>
  );
}

export default TextStyle;
