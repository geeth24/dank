import MemeImage from "@/components/MemeImage";
import Navbar from "@/components/Navbar";
import TextInput from "@/components/TextInput";
import Upload from "@/components/Upload";
import Head from "next/head";
import { useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import YSlider from "@/components/YSlider";
import FontSlider from "@/components/FontSlider";

export default function Home() {
  const [image, setImage] = useState<string | null>("");
  const [text, setText] = useState("");

  const [textPosition, setTextPosition] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const [windowWidth, setWindowWidth] = useState(0);

  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    setCanvasHeight(document.getElementById("capture")?.clientHeight || 0);
  }, [windowWidth, image]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value);
    if (newPosition >= -canvasHeight && newPosition <= canvasHeight) {
      setTextPosition(newPosition);
    }
  };

  const handleWindowResize = () => {
    setCanvasHeight(document.getElementById("capture")?.clientHeight || 0);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const shareImage = () => {
    htmlToImage
      .toBlob(document.getElementById("capture") as HTMLElement)
      .then(function (dataUrl) {
        if (navigator.share) {
          navigator
            .share({
              files: [
                new File([dataUrl as BlobPart], "meme.png", {
                  type: "image/png",
                }),
              ],
            })
            .then(() => {
              console.log("Image shared successfully");
            })
            .catch((error) => {
              console.error("Error sharing image:", error);
            });
        } else {
          console.log("Sharing not supported on this device");
        }
      });
  };

  return (
    <div className="h-fit bg-black p-6">
      <Head>
        <title>Dank - The Meme Generator</title>
      </Head>
      <Navbar />
      <Upload image={image} setImage={setImage} />
      {image && (
        <>
          <MemeImage
            image={image}
            memeText={text}
            textPosition={textPosition}
            fontSize={fontSize}
          />
          <YSlider
            canvasHeight={canvasHeight}
            textPosition={textPosition}
            handleSliderChange={handleSliderChange}
          />

          <FontSlider fontSize={fontSize} setFontSize={setFontSize} />
          <TextInput memeText={text} setMemeText={setText} />
          <button
            className="flex w-full flex-col items-center rounded-xl bg-[#0F77FF] px-6 py-4 text-2xl font-bold text-[#FAFAFA] transition duration-200 hover:bg-[#0F77FFb3] hover:shadow-lg"
            onClick={shareImage}
          >
            Share
          </button>
        </>
      )}
    </div>
  );
}
