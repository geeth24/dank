import Image from "next/image";
import React from "react";

interface MemeImageProps {
  image: string | null;
  memeText: string;
  textPosition: number;
  fontSize: number;
}

function MemeImage({
  image,
  memeText,
  textPosition,
  fontSize,
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
  return (
    <div className="mt-4">
      <div className="relative flex w-full items-center justify-center">
        <div id="capture" className="relative">
          {image && (
            <img
              src={image}
              alt="uploaded"
              width={1000}
              height={500}
              className="w-full object-contain"
            />
          )}
          {positions.map((position) => (
            <p
              key={`${position.top}-${position.left}`}
              className="absolute w-full text-center text-black"
              style={{
                top: `${textPosition + position.top}px`,
                left: `${position.left}px`,
                fontSize: `${fontSize}px`,
                fontFamily: "Inter",
              }}
            >
              {memeText}
            </p>
          ))}
          <p
            className="absolute w-full text-center text-white"
            style={{
              top: `${textPosition}px`,
              fontSize: `${fontSize}px`,
              fontFamily: "Inter",
            }}
          >
            {memeText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemeImage;
