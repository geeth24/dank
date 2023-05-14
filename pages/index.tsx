import MemeImage from "@/components/MemeImage";
import Navbar from "@/components/Navbar";
import TextInput from "@/components/TextInput";
import Upload from "@/components/Upload";
import Head from "next/head";
import { useEffect, useState } from "react";
import YSlider from "@/components/YSlider";
import FontSlider from "@/components/FontSlider";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

export default function Home() {
  const [image, setImage] = useState<string | null>("");
  const [text, setText] = useState("");

  const [textPosition, setTextPosition] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const [windowWidth, setWindowWidth] = useState(0);

  const [fontSize, setFontSize] = useState(20);
  const [sharing, setSharing] = useState(false);
  

  const [captureElement, setCaptureElement] = useState<HTMLElement | null>();


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

const share = async () => {
  setSharing(true);
  setCaptureElement(document.getElementById("capture"));

  if (captureElement) {
      const dataUrl = await domtoimage.toJpeg(captureElement as HTMLElement);
  const blob = await (await fetch(dataUrl)).blob();
  const filesArray = [new File([blob], "meme.jpeg", { type: "image/jpeg" })];
  const shareData = {
    files: filesArray,
  };
  if (navigator.canShare && navigator.canShare(shareData)) {
    await navigator.share(shareData);
  } else {
    console.log("Your system doesn't support sharing files.");
  }

  setSharing(false);

  }
};

useEffect(() => {
    setCaptureElement(document.getElementById("capture"));
}, [image, text, textPosition, fontSize]);

 

  const down = () => {
    const captureElement = document.getElementById("capture") as HTMLElement;
    html2canvas(captureElement).then(function (canvas) {
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = "meme.png";
      a.click();
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
            onClick={share}
          >
            Share
          </button>
        </>
      )}
    </div>
  );
}
