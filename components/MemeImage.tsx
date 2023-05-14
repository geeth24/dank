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
  return (
    <div className="mt-4">
      <div className="relative flex w-full items-center justify-center bg-transparent">
        <div id="capture" className="relative">
          {image && (
            <Image
              src={image}
              alt="uploaded"
              width={1000}
              height={500}
              className="w-full object-contain"
            />
          )}
          <p
            className="absolute w-full bg-black/50 text-center text-white"
            style={{ top: `${textPosition}px`, fontSize: `${fontSize}px` }}
          >
            {memeText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemeImage;
