import Image from "next/image";
import React from "react";

interface MemeImageProps {
  image: string | null;
  memeText: string;
  textPosition: number;
  fontSize: number;
  selectedTextStyle: string;
}

function MemeImage({
  image,
  memeText,
  textPosition,
  fontSize,
  selectedTextStyle,
}: MemeImageProps) {
  const strokeSize = 3; // Increase this value to make the stroke thicker
  const positions = [
    { top: -strokeSize, left: 0 },
    { top: strokeSize, left: 0 },
    { top: 0, left: -strokeSize },
    { top: 0, left: strokeSize },
    { top: -strokeSize, left: -strokeSize },
    { top: -strokeSize, left: strokeSize },
    { top: strokeSize, left: -strokeSize },
    { top: strokeSize, left: strokeSize },
  ];
  const formattedMemeText = memeText.replace(/\n/g, "<br>");

  return (
    <div className="mt-4">
      <div className="relative flex w-full items-center justify-center">
        <div id="capture" className="relative overflow-hidden">
          {image && (
            <img
              src={image}
              alt="uploaded"
              width={1000}
              height={500}
              className="w-full object-contain"
            />
          )}
          {selectedTextStyle === "Default" && (
            <div>
              {positions.map((position) => (
                <div
                  key={`${position.top}-${position.left}`}
                  className="absolute w-full text-center"
                  style={{
                    top: `${textPosition + position.top}px`,
                    left: `${position.left}px`,
                    fontSize: `${fontSize}px`,
                    fontFamily: "Helvetica",
                    clipPath: "inset(0)",
                  }}
                >
                  {/* Use dangerouslySetInnerHTML to render HTML */}
                  <span
                    dangerouslySetInnerHTML={{ __html: formattedMemeText }}
                  />
                </div>
              ))}
              <div
                className="absolute w-full text-center text-white"
                style={{
                  top: `${textPosition}px`,
                  fontSize: `${fontSize}px`,
                  fontFamily: "Helvetica",
                  clipPath: "inset(0)",
                }}
              >
                {/* Use dangerouslySetInnerHTML to render HTML */}
                <span dangerouslySetInnerHTML={{ __html: formattedMemeText }} />
              </div>
            </div>
          )}
          {selectedTextStyle === "Snapchat" && (
            <div
              className="absolute w-full bg-[#03000D80]/50 text-center text-white"
              style={{
                top: `${textPosition}px`,
                fontSize: `${fontSize}px`,
                fontFamily: "Helvetica",
                clipPath: "inset(0)",
              }}
            >
              {/* Use dangerouslySetInnerHTML to render HTML */}
              <span dangerouslySetInnerHTML={{ __html: formattedMemeText }} />
            </div>
          )}
          {selectedTextStyle === "Instagram" && (
            <div
              className="absolute bg-black pb-2 pl-10 pr-10 pt-2 text-center font-bold text-white"
              style={{
                top: `${textPosition}px`,
                fontSize: `${fontSize}px`,
                borderRadius: `${fontSize / 5}px`,
                fontFamily: "Helvetica",
                clipPath: "inset(0)",
                left: "50%", // Add this line
                transform: "translateX(-50%)", // Add this line
              }}
            >
              {/* Use dangerouslySetInnerHTML to render HTML */}
              <span dangerouslySetInnerHTML={{ __html: formattedMemeText }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemeImage;
