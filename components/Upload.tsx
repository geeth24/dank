import React from "react";

interface UploadProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

function Upload({ image, setImage }: UploadProps) {
  return (
    <div className="mt-4">
      <label className="cursor-pointer">
        <div className="flex w-full flex-col items-center rounded-xl bg-[#0DB090] px-6 py-4 text-2xl font-bold text-[#FAFAFA] transition duration-200 hover:bg-[#0db08fb3] hover:shadow-lg">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                  setImage(e.target?.result as string);
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
          Upload Image
        </div>
      </label>
    </div>
  );
}

export default Upload;
