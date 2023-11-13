import Image from "next/image";
import React from "react";
import { StrokedText } from "stroked-text";
import TwitterIcon from "./TwitterIcon";

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
  const lines = memeText.split("\n");

  return (
    <div className="mt-4">
      <div className="relative flex w-full items-center justify-center">
        <div id="capture" className="relative overflow-hidden">
          {image && selectedTextStyle != "Twitter" && (
            <img
              src={image}
              alt="uploaded"
              width={1000}
              height={500}
              className="w-full object-contain"
            />
          )}
          {selectedTextStyle === "Default" &&
            lines.map((line, index) => (
              //@ts-ignore
              <StrokedText
                key={index}
                fill="white"
                stroke="black"
                strokeWidth={fontSize / 5}
                style={{
                  position: "absolute",
                  textAlign: "center",
                  font: `bold ${fontSize}px sans-serif`,
                  top: `${textPosition + index * fontSize}px`,
                  fontSize: `${fontSize}px`,
                  fontFamily: "Helvetica",
                  clipPath: "inset(0)",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  // letterSpacing: "0.1em",
                }}
              >
                {line}
              </StrokedText>
            ))}
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
          {selectedTextStyle === "Twitter" && (
            <div className="">
              {/* Use dangerouslySetInnerHTML to render HTML */}

              {image && (
                <div className="p-16 lg:p-12">
                  <img
                    src={image}
                    alt="uploaded"
                    width={1000}
                    height={500}
                    className="z-0 h-full w-full object-contain"
                  />
                  <div className="absolute left-0 top-0 z-0 h-full w-full bg-[#f7f7f7]" />
                  <div className="absolute left-0 top-0 z-10 p-2">
                    <div className="flex flex-row items-start space-x-2">
                      {image && (
                        <img
                          src="/dankfavi.png"
                          alt="Overlay Image"
                          className="h-10 w-10 rounded-full object-contain"
                        />
                      )}
                      <div className="flex flex-col items-start space-x-1">
                        <div className="flex flex-row items-start space-x-1">
                          <p className="text-base font-bold text-black">
                            kirkpatrick
                          </p>
                          <p className="text-sm font-bold text-[#67727E]">
                            @patickrik31 · 22h{" "}
                          </p>
                        </div>
                        <p className="text-base text-black">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formattedMemeText
                                ? formattedMemeText
                                : "Your Text Goes Here",
                            }}
                          />
                        </p>
                        {image && (
                          <img
                            src={image}
                            alt="Overlay Image"
                            className="h-full w-[95%] rounded-lg object-contain"
                          />
                        )}
                        <div className="mt-4 flex w-[95%] flex-row items-center justify-between">
                          <TwitterIcon image="Reply" count={0} />
                          <TwitterIcon image="Retweet" count={0} />
                          <TwitterIcon image="Like" count={0} />
                          <TwitterIcon image="Share" count={0} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Add this img element */}
            </div>
          )}
          {selectedTextStyle === "Instagram" && (
            <div
              className="absolute bg-black p-2 text-center font-bold text-white"
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
