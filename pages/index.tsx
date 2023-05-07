import { useState } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";

export default function Home() {
  const [image, setImage] = useState<string | null>("/soyjak6 1.png"); // "/soyjak6 1.png
  const [text, setText] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleShare = () => {
    html2canvas(document.querySelector("#capture") as HTMLElement).then(
      (canvas) => {
        const a = document.createElement("a");
        if (navigator.share) {
          canvas.toBlob((blob) => {
            navigator.share({
              title: "Meme",
              text: "Meme",
              files: [
                new File([blob as BlobPart], "meme.png", { type: "image/png" }),
              ],
            });
          });
        } else {
          const a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          a.download = "meme.png";
          a.click();
        }
      }
    );
  };

  return (
    <div className="bg-black">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div>
          <label className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer">
            Upload Image
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <input
          type="text"
          placeholder="Enter your text here"
          value={text}
          onChange={handleTextChange}
          className="border-2 border-gray-400 p-2 rounded-md my-5"
        />{" "}
        <div id="capture" className="relative">
          {image && (
            <Image src={image} alt="uploaded" width={500} height={500} />
            // <div className="bg-white w-96 h-96"></div>
          )}
          <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-8xl font-black pb-10 text-stroke">
            {text}
          </p>
        </div>
        <button
          onClick={handleShare}
          className="bg-gray-300 px-4 py-2 mt-2 rounded-md cursor-pointer"
        >
          Share
        </button>
      </div>
    </div>
  );
}
