import React from "react";

interface UploadProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  generateMeme: () => void;
}

function Upload({ image, setImage, generateMeme }: UploadProps) {
  const convertToJpeg = (file: File) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const newFile = new File([blob], "converted-image.jpeg", {
              type: "image/jpeg",
            });

            if (newFile.size / 1024 / 1024 < 2) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setImage(e.target?.result as string);
              };
              reader.readAsDataURL(newFile);
            } else {
              alert("The converted image is over 2MB.");
            }
          }
        },
        "image/jpeg",
        1 // Adjust the quality to manage the size
      );
    };

    img.onerror = () => {
      alert("There was an error processing your image");
    };

    img.src = URL.createObjectURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImage(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        convertToJpeg(file);
      }
    }
    generateMeme();
  };

  return (
    <div className="mt-4">
      <label className="cursor-pointer">
        <div className="flex w-full flex-col items-center rounded-xl bg-[#0DB090] px-6 py-4 text-2xl font-bold text-[#FAFAFA] transition duration-200 hover:bg-[#0db08fb3] hover:shadow-lg">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          Upload Image
        </div>
      </label>
    </div>
  );
}

export default Upload;
