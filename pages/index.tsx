import MemeImage from "@/components/MemeImage";
import Navbar from "@/components/Navbar";
import TextInput from "@/components/TextInput";
import Upload from "@/components/Upload";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import YSlider from "@/components/YSlider";
import FontSlider from "@/components/FontSlider";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import TextStyle from "@/components/TextStyle";

export default function Home() {
  const [image, setImage] = useState<string | null>("");
  const [text, setText] = useState("");

  const [textPosition, setTextPosition] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const [windowWidth, setWindowWidth] = useState(0);

  const [fontSize, setFontSize] = useState(20);
  const [sharing, setSharing] = useState(false);
  const [generating, setGenerating] = useState(false);

  const textStyles = ["Default", "Snapchat", "Twitter", "Instagram"];

  const [selectedTextStyle, setSelectedTextStyle] = useState<string>("Default");

  const [generated, setGenerated] = useState(false);

  const [shareData, setShareData] = useState<any>();
  const [countdown, setCountdown] = useState(3); // Start the countdown at 3 seconds
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    setCanvasHeight(document.getElementById("capture")?.clientHeight || 0);
  }, [windowWidth, image]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value);
    if (newPosition >= -canvasHeight && newPosition <= canvasHeight) {
      setTextPosition(newPosition);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setCanvasHeight(document.getElementById("capture")?.clientHeight || 0);
    };

    window.addEventListener("resize", handleResize);
    // Initial resize call
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateMeme = useCallback(async () => {
    setGenerating(true);
    const captureElement = document.getElementById("capture");

    if (captureElement) {
      const dataUrl = await domtoimage.toJpeg(captureElement);
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const filesArray = [
        new File([blob], "meme.jpeg", { type: "image/jpeg" }),
      ];

      setShareData({
        files: filesArray,
      });

      setGenerated(true);
      setChangesMade(false);
    }

    setGenerating(false);
  }, []);

  const shareMeme = useCallback(async () => {
    if (!sharing && shareData) {
      let shareTimeout: number | undefined;
      setSharing(true);

      if (navigator.canShare && navigator.canShare(shareData)) {
        // Set a timeout to cancel sharing if not completed in 10 seconds
        shareTimeout = window.setTimeout(() => {
          setSharing(false);
        }, 10000); // 10 seconds timeout

        try {
          await navigator.share(shareData);
          // Clear the timeout if sharing is successful
          clearTimeout(shareTimeout);
        } catch (error) {
          // Handle the error case
          console.error("Error sharing:", error);
        } finally {
          // Ensure that sharing state is set to false after sharing
          setSharing(false);
        }
      } else {
        setSharing(false);
        alert("Sharing is not supported or the data is not shareable.");
      }
    }
    setSharing(false);
    setShareData(undefined);
  }, [sharing, shareData]);

  // Simplify useEffect to watch for specific changes
  useEffect(() => {
    if (image || text || textPosition || fontSize || selectedTextStyle) {
      setGenerated(false);
      setChangesMade(true);
      setCountdown(3); // Reset the countdown to 3 seconds whenever image or text changes
      const timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [image, text, textPosition, fontSize, selectedTextStyle, generateMeme]);

  useEffect(() => {
    if (countdown === 0) {
      generateMeme();
    }
  }, [countdown, generateMeme]);
  return (
    <div className="mx-auto h-fit max-w-7xl  overflow-hidden bg-black p-6">
      <Head>
        <title>Dank - The Meme Generator</title>
      </Head>
      <Navbar />
      <Upload image={image} setImage={setImage} generateMeme={generateMeme} />
      {image && (
        <>
          <MemeImage
            image={image}
            memeText={text}
            textPosition={textPosition}
            fontSize={fontSize}
            selectedTextStyle={selectedTextStyle}
          />
          <TextInput memeText={text} setMemeText={setText} />

          {selectedTextStyle != "Twitter" && (
            <>
              <YSlider
                canvasHeight={canvasHeight}
                textPosition={textPosition}
                handleSliderChange={handleSliderChange}
              />

              <FontSlider fontSize={fontSize} setFontSize={setFontSize} />
            </>
          )}
          <TextStyle
            selectedTextStyle={selectedTextStyle}
            setSelectedTextStyle={setSelectedTextStyle}
            textStyles={textStyles}
          />

          <button
            className="mt-4 flex w-full flex-col items-center rounded-xl bg-[#0F77FF] px-6 py-4 text-2xl font-bold text-[#FAFAFA] transition duration-200 hover:bg-[#0F77FFb3] hover:shadow-lg"
            onClick={generated ? shareMeme : generateMeme}
          >
            {sharing
              ? "Sharing..."
              : generated
              ? "Share"
              : `${
                  generating
                    ? "Generating..."
                    : `${
                        changesMade
                          ? `${countdown > 0 ? "Generating..." : "Generate"}`
                          : "Generate"
                      }`
                }`}
          </button>
        </>
      )}
    </div>
  );
}
