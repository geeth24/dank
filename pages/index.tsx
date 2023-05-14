import MemeImage from "@/components/MemeImage";
import Navbar from "@/components/Navbar";
import TextInput from "@/components/TextInput";
import Upload from "@/components/Upload";
import html2canvas from "html2canvas";
import Head from "next/head";
import { useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import YSlider from "@/components/YSlider";
import FontSlider from "@/components/FontSlider";

export default function Home() {
  const [image, setImage] = useState<string | null>(""); // "/soyjak6 1.png
  const [text, setText] = useState("");

  const [textPosition, setTextPosition] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const [windowWidth, setWindowWidth] = useState(0);

  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    setCanvasHeight(document.getElementById("capture")?.clientHeight || 0);
    console.log(canvasHeight);
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
            onClick={() => {
              htmlToImage
                .toJpeg(document.getElementById("capture") as HTMLElement)
                .then(function (dataUrl) {
                  var link = document.createElement("a");
                  link.download = "meme.jpeg";
                  link.href = dataUrl;
                  link.click();
                });
            }}
          >
            Share
          </button>
        </>
      )}
    </div>
  );
}
