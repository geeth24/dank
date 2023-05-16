import React from "react";

interface TextInputProps {
  memeText: string;
  setMemeText: React.Dispatch<React.SetStateAction<string>>;
}

function TextInput({ memeText, setMemeText }: TextInputProps) {
  return (
    <div>
      <textarea
        placeholder="Enter your text here"
        className="my-5 w-full rounded-lg border-[1px] border-[#FAFAFA] bg-transparent p-2 py-2 text-2xl font-bold text-white placeholder-white placeholder-opacity-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0DB090]"
        value={memeText}
        onChange={(e) => setMemeText(e.target.value)}
      />
    </div>
  );
}

export default TextInput;
